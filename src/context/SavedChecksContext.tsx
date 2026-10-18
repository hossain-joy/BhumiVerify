import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageAdapter, STORAGE_KEYS } from '../lib/storageAdapter';
import { SEED_SAVED_CHECKS, SavedLandCheck, SavedVerificationTask } from '../data/seedSavedChecks';
import { TASK_TEXT_TRANSLATIONS } from '../utils/taskTranslations';
export type { SavedLandCheck, SavedVerificationTask };

interface SavedChecksContextType {
  savedChecks: SavedLandCheck[];
  getCheckById: (id: string) => SavedLandCheck | undefined;
  saveCheck: (
    checkData: Omit<SavedLandCheck, 'id' | 'createdAt' | 'updatedAt'>
  ) => SavedLandCheck;
  updateCheck: (id: string, updates: Partial<SavedLandCheck>) => void;
  deleteCheck: (id: string) => void;
  duplicateCheck: (id: string) => SavedLandCheck | null;
  updateNotes: (id: string, notes: string) => void;
  toggleTaskStatus: (checkId: string, taskId: string) => void;
  addTask: (
    checkId: string,
    task: Omit<SavedVerificationTask, 'id'>
  ) => void;
  deleteTask: (checkId: string, taskId: string) => void;
  resetToSeedChecks: () => void;
  // Compare state helpers
  compareIds: string[];
  toggleCompareId: (id: string) => void;
  clearCompareIds: () => void;
}

const SavedChecksContext = createContext<SavedChecksContextType | undefined>(undefined);

export const SavedChecksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedChecks, setSavedChecks] = useState<SavedLandCheck[]>(() => {
    try {
      const loaded = StorageAdapter.getItem<SavedLandCheck[]>(
        STORAGE_KEYS.SAVED_CHECKS,
        SEED_SAVED_CHECKS
      );
      if (Array.isArray(loaded)) {
        return loaded.map((c) => {
          const seedCheck = SEED_SAVED_CHECKS.find((s) => s.id === c.id);
          const tasks = Array.isArray(c?.verificationTasks) ? c.verificationTasks : [];
          const enrichedTasks = tasks.map((t) => {
            const seedTask = seedCheck?.verificationTasks.find((st) => st.id === t.id);
            const titleLower = t.title ? t.title.trim().toLowerCase() : '';
            const descLower = t.description ? t.description.trim().toLowerCase() : '';
            const notesLower = t.notes ? t.notes.trim().toLowerCase() : '';
            return {
              ...t,
              titleBn: t.titleBn || seedTask?.titleBn || (titleLower ? TASK_TEXT_TRANSLATIONS[titleLower] : undefined),
              descriptionBn: t.descriptionBn || seedTask?.descriptionBn || (descLower ? TASK_TEXT_TRANSLATIONS[descLower] : undefined),
              notesBn: t.notesBn || seedTask?.notesBn || (notesLower ? TASK_TEXT_TRANSLATIONS[notesLower] : undefined),
            };
          });
          return {
            ...c,
            verificationTasks: enrichedTasks,
          };
        });
      }
    } catch {
      // ignore
    }
    return SEED_SAVED_CHECKS;
  });

  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    StorageAdapter.setItem(STORAGE_KEYS.SAVED_CHECKS, savedChecks);
  }, [savedChecks]);

  const getCheckById = (id: string): SavedLandCheck | undefined => {
    return savedChecks.find((c) => c.id === id);
  };

  const saveCheck = (
    checkData: Omit<SavedLandCheck, 'id' | 'createdAt' | 'updatedAt'>
  ): SavedLandCheck => {
    const now = new Date().toISOString();
    const newCheck: SavedLandCheck = {
      ...checkData,
      id: `CHK-${Date.now().toString().slice(-6)}`,
      createdAt: now,
      updatedAt: now,
      verificationTasks: checkData.verificationTasks || [
        {
          id: `TASK-${Date.now()}-1`,
          title: 'Obtain certified copy of Mutation Porcha from AC (Land)',
          titleBn: 'সহকারী কমিশনার (ভূমি) অফিস থেকে নামজারি পর্চার সার্টিফাইড কপি সংগ্রহ',
          description: 'Apply at the local Revenue Circle office for a signed, certified Record of Rights.',
          descriptionBn: 'উপজেলা/সার্কেল ভূমি অফিস থেকে নামজারি অনুমোদনের সত্যায়িত খতিয়ান ও ডিসিআর সংগ্রহ করুন।',
          status: 'not_started',
        },
        {
          id: `TASK-${Date.now()}-2`,
          title: 'Conduct Nil Search at Sub-Registry Office',
          titleBn: 'সাব-রেজিস্ট্রি অফিসে ১২-২৫ বছরের বালাম তল্লাশি (Nil Search)',
          description: 'Search Book 1 indexes for at least 12-25 years to uncover unrecorded transfers or mortgages.',
          descriptionBn: '১ নম্বর বালামের ইনডেক্স তল্লাশ করে অপ্রকাশিত কোনো রেজিস্ট্রি দলিল বা ব্যাংক বন্ধক রয়েছে কি না তা নিশ্চিত করুন।',
          status: 'not_started',
        },
        {
          id: `TASK-${Date.now()}-3`,
          title: 'On-site physical possession and boundary verification',
          titleBn: 'মাঠপর্যায়ে সশরীরে দখল ও সীমানা নির্ধারণ যাচাই',
          description: 'Inspect physical ground boundaries and interview adjacent landholders.',
          descriptionBn: 'জমির চারপাশের সীমানা খুঁটি এবং দাগের প্রকৃত অবস্থান সরেজমিনে যাচাই করুন।',
          status: 'not_started',
        },
      ],
    };

    setSavedChecks((prev) => [newCheck, ...prev]);
    return newCheck;
  };

  const updateCheck = (id: string, updates: Partial<SavedLandCheck>) => {
    setSavedChecks((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...updates, updatedAt: new Date().toISOString() }
          : c
      )
    );
  };

  const deleteCheck = (id: string) => {
    setSavedChecks((prev) => prev.filter((c) => c.id !== id));
    setCompareIds((prev) => prev.filter((item) => item !== id));
  };

  const duplicateCheck = (id: string): SavedLandCheck | null => {
    const target = savedChecks.find((c) => c.id === id);
    if (!target) return null;

    const now = new Date().toISOString();
    const duplicated: SavedLandCheck = {
      ...target,
      id: `CHK-${Date.now().toString().slice(-6)}`,
      nickname: `Copy of ${target.nickname}`,
      createdAt: now,
      updatedAt: now,
      verificationTasks: target.verificationTasks.map((t, idx) => ({
        ...t,
        id: `TASK-${Date.now()}-${idx + 1}`,
      })),
    };

    setSavedChecks((prev) => [duplicated, ...prev]);
    return duplicated;
  };

  const updateNotes = (id: string, notes: string) => {
    updateCheck(id, { userNotes: notes });
  };

  const toggleTaskStatus = (checkId: string, taskId: string) => {
    setSavedChecks((prev) =>
      prev.map((c) => {
        if (c.id !== checkId) return c;
        const tasksList = Array.isArray(c.verificationTasks) ? c.verificationTasks : [];
        const updatedTasks = tasksList.map((t) => {
          if (t.id !== taskId) return t;
          let nextStatus: SavedVerificationTask['status'] = 'in_progress';
          if (t.status === 'not_started') nextStatus = 'in_progress';
          else if (t.status === 'in_progress') nextStatus = 'completed';
          else nextStatus = 'not_started';
          return { ...t, status: nextStatus };
        });
        return {
          ...c,
          verificationTasks: updatedTasks,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const addTask = (checkId: string, task: Omit<SavedVerificationTask, 'id'>) => {
    setSavedChecks((prev) =>
      prev.map((c) => {
        if (c.id !== checkId) return c;
        const tasksList = Array.isArray(c.verificationTasks) ? c.verificationTasks : [];
        const titleLower = task.title ? task.title.trim().toLowerCase() : '';
        const descLower = task.description ? task.description.trim().toLowerCase() : '';
        const notesLower = task.notes ? task.notes.trim().toLowerCase() : '';
        const newTask: SavedVerificationTask = {
          ...task,
          id: `TASK-${Date.now()}`,
          titleBn: task.titleBn || (titleLower ? TASK_TEXT_TRANSLATIONS[titleLower] : undefined),
          descriptionBn: task.descriptionBn || (descLower ? TASK_TEXT_TRANSLATIONS[descLower] : undefined),
          notesBn: task.notesBn || (notesLower ? TASK_TEXT_TRANSLATIONS[notesLower] : undefined),
        };
        return {
          ...c,
          verificationTasks: [...tasksList, newTask],
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const deleteTask = (checkId: string, taskId: string) => {
    setSavedChecks((prev) =>
      prev.map((c) => {
        if (c.id !== checkId) return c;
        const tasksList = Array.isArray(c.verificationTasks) ? c.verificationTasks : [];
        return {
          ...c,
          verificationTasks: tasksList.filter((t) => t.id !== taskId),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const resetToSeedChecks = () => {
    setSavedChecks(SEED_SAVED_CHECKS);
    StorageAdapter.setItem(STORAGE_KEYS.SAVED_CHECKS, SEED_SAVED_CHECKS);
    setCompareIds([]);
  };

  const toggleCompareId = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 2) {
        // Replace second item or alert max 2
        return [prev[0], id];
      }
      return [...prev, id];
    });
  };

  const clearCompareIds = () => {
    setCompareIds([]);
  };

  return (
    <SavedChecksContext.Provider
      value={{
        savedChecks,
        getCheckById,
        saveCheck,
        updateCheck,
        deleteCheck,
        duplicateCheck,
        updateNotes,
        toggleTaskStatus,
        addTask,
        deleteTask,
        resetToSeedChecks,
        compareIds,
        toggleCompareId,
        clearCompareIds,
      }}
    >
      {children}
    </SavedChecksContext.Provider>
  );
};

export const useSavedChecks = (): SavedChecksContextType => {
  const context = useContext(SavedChecksContext);
  if (!context) {
    throw new Error('useSavedChecks must be used within a SavedChecksProvider');
  }
  return context;
};
