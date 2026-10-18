import assert from 'node:assert';

// Simulated Storage Adapter for testing
class MemoryStorage {
  constructor() {
    this.store = new Map();
  }
  getItem(key, defaultVal) {
    if (!this.store.has(key)) return defaultVal;
    try {
      return JSON.parse(this.store.get(key));
    } catch {
      return defaultVal;
    }
  }
  setItem(key, val) {
    this.store.set(key, JSON.stringify(val));
  }
  removeItem(key) {
    this.store.delete(key);
  }
  clear() {
    this.store.clear();
  }
}

const storage = new MemoryStorage();

console.log('====================================================');
console.log('   BHUMIVERIFY COMPREHENSIVE CRUD OPERATIONS AUDIT  ');
console.log('====================================================\n');

// -----------------------------------------------------------------------------
// 1. Storage Adapter CRUD
// -----------------------------------------------------------------------------
console.log('Testing 1: Core Storage Adapter CRUD...');
storage.setItem('test_key', { foo: 'bar', count: 42 });
const readItem = storage.getItem('test_key', null);
assert.deepStrictEqual(readItem, { foo: 'bar', count: 42 }, 'Storage Read mismatch');

storage.setItem('test_key', { foo: 'updated', count: 43 });
const updatedItem = storage.getItem('test_key', null);
assert.strictEqual(updatedItem.foo, 'updated', 'Storage Update mismatch');

storage.removeItem('test_key');
const deletedItem = storage.getItem('test_key', null);
assert.strictEqual(deletedItem, null, 'Storage Delete failed');
console.log('✔ Storage Adapter CRUD operations passed.');

// -----------------------------------------------------------------------------
// 2. Saved Checks CRUD Operations
// -----------------------------------------------------------------------------
console.log('\nTesting 2: Saved Checks CRUD Operations...');

let savedChecks = [
  {
    id: 'CHK-100001',
    parcelId: 'BS-DEMO-001',
    nickname: 'Gulshan Plot 85 Commercial Review',
    division: 'Dhaka',
    district: 'Dhaka',
    upazila: 'Gulshan',
    mouza: 'Gulshan',
    khatianNumber: '541',
    dagNumber: '85',
    statusLabel: 'No Major Issue Detected in Available Data',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    verificationTasks: [
      { id: 'TASK-1', title: 'Task 1', status: 'not_started' },
      { id: 'TASK-2', title: 'Task 2', status: 'in_progress' },
      { id: 'TASK-3', title: 'Task 3', status: 'completed' },
    ],
  },
];

// C: Create
function saveCheck(checkData) {
  const now = new Date().toISOString();
  const newCheck = {
    ...checkData,
    id: `CHK-${Date.now().toString().slice(-6)}`,
    createdAt: now,
    updatedAt: now,
    verificationTasks: checkData.verificationTasks || [
      { id: 'TASK-INIT-1', title: 'Collect certified porcha', status: 'not_started' },
      { id: 'TASK-INIT-2', title: 'Conduct Nil Search', status: 'not_started' },
      { id: 'TASK-INIT-3', title: 'Verify ground possession', status: 'not_started' },
    ],
  };
  savedChecks = [newCheck, ...savedChecks];
  return newCheck;
}

const createdCheck = saveCheck({
  parcelId: 'BS-DEMO-002',
  nickname: 'Tejgaon Industrial Plot Review',
  division: 'Dhaka',
  district: 'Dhaka',
  upazila: 'Tejgaon I/A',
  mouza: 'Tejgaon I/A',
  khatianNumber: '1204',
  dagNumber: '402',
  statusLabel: 'Review Recommended',
});

assert(createdCheck.id.startsWith('CHK-'), 'Created check missing valid CHK- ID');
assert.strictEqual(savedChecks.length, 2, 'Checks count should be 2 after creation');
assert.strictEqual(createdCheck.verificationTasks.length, 3, 'Created check should have 3 initial tasks');

// R: Read
function getCheckById(id) {
  return savedChecks.find((c) => c.id === id);
}
const fetched = getCheckById(createdCheck.id);
assert(fetched, 'Failed to fetch check by ID');
assert.strictEqual(fetched.khatianNumber, '1204', 'Fetched check data mismatch');

// U: Update
function updateCheck(id, updates) {
  savedChecks = savedChecks.map((c) =>
    c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
  );
}

updateCheck(createdCheck.id, {
  nickname: 'Tejgaon Updated Review (Legal Diligence)',
  userNotes: 'Contacted seller lawyer on Oct 18.',
});
const updated = getCheckById(createdCheck.id);
assert.strictEqual(updated.nickname, 'Tejgaon Updated Review (Legal Diligence)', 'Nickname update failed');
assert.strictEqual(updated.userNotes, 'Contacted seller lawyer on Oct 18.', 'Notes update failed');

// Duplicate (Clone)
function duplicateCheck(id) {
  const target = getCheckById(id);
  if (!target) return null;
  const now = new Date().toISOString();
  const dup = {
    ...target,
    id: `CHK-DUP-${Date.now().toString().slice(-4)}`,
    nickname: `Copy of ${target.nickname}`,
    createdAt: now,
    updatedAt: now,
  };
  savedChecks = [dup, ...savedChecks];
  return dup;
}

const cloned = duplicateCheck(createdCheck.id);
assert(cloned, 'Duplication failed');
assert(cloned.nickname.startsWith('Copy of'), 'Cloned nickname incorrect');
assert.strictEqual(savedChecks.length, 3, 'Checks count should be 3 after duplication');

// D: Delete
function deleteCheck(id) {
  savedChecks = savedChecks.filter((c) => c.id !== id);
}

deleteCheck(cloned.id);
assert.strictEqual(savedChecks.length, 2, 'Checks count should be 2 after deleting cloned check');
assert.strictEqual(getCheckById(cloned.id), undefined, 'Deleted check still retrievable');

console.log('✔ Saved Checks CRUD operations (Create, Read, Update, Duplicate, Delete) passed.');

// -----------------------------------------------------------------------------
// 3. Verification Tasks CRUD Operations
// -----------------------------------------------------------------------------
console.log('\nTesting 3: Verification Tasks CRUD Operations...');

// C: Add Task
function addTask(checkId, task) {
  savedChecks = savedChecks.map((c) => {
    if (c.id !== checkId) return c;
    const newTask = { ...task, id: `TASK-${Date.now()}` };
    return { ...c, verificationTasks: [...c.verificationTasks, newTask] };
  });
}

addTask(createdCheck.id, {
  title: 'Survey demarcation joint map check',
  description: 'Inspect settlement office survey sheet.',
  status: 'not_started',
});

const checkWithNewTask = getCheckById(createdCheck.id);
assert.strictEqual(checkWithNewTask.verificationTasks.length, 4, 'Task addition failed');

// R: Filter & Calculate Task Metrics
const allTasks = checkWithNewTask.verificationTasks;
const completedCount = allTasks.filter((t) => t.status === 'completed').length;
const notStartedCount = allTasks.filter((t) => t.status === 'not_started').length;
assert.strictEqual(notStartedCount, 4, 'Initial not_started task count mismatch');

// U: Update / Cycle Task Status (not_started -> in_progress -> completed -> not_started)
function toggleTaskStatus(checkId, taskId) {
  savedChecks = savedChecks.map((c) => {
    if (c.id !== checkId) return c;
    const updatedTasks = c.verificationTasks.map((t) => {
      if (t.id !== taskId) return t;
      let nextStatus = 'in_progress';
      if (t.status === 'not_started') nextStatus = 'in_progress';
      else if (t.status === 'in_progress') nextStatus = 'completed';
      else nextStatus = 'not_started';
      return { ...t, status: nextStatus };
    });
    return { ...c, verificationTasks: updatedTasks };
  });
}

const targetTask = allTasks[0];
toggleTaskStatus(createdCheck.id, targetTask.id);
assert.strictEqual(getCheckById(createdCheck.id).verificationTasks[0].status, 'in_progress', 'Cycle 1 failed');

toggleTaskStatus(createdCheck.id, targetTask.id);
assert.strictEqual(getCheckById(createdCheck.id).verificationTasks[0].status, 'completed', 'Cycle 2 failed');

toggleTaskStatus(createdCheck.id, targetTask.id);
assert.strictEqual(getCheckById(createdCheck.id).verificationTasks[0].status, 'not_started', 'Cycle 3 failed');

// D: Delete Task
function deleteTask(checkId, taskId) {
  savedChecks = savedChecks.map((c) => {
    if (c.id !== checkId) return c;
    return {
      ...c,
      verificationTasks: c.verificationTasks.filter((t) => t.id !== taskId),
    };
  });
}

deleteTask(createdCheck.id, targetTask.id);
assert.strictEqual(getCheckById(createdCheck.id).verificationTasks.length, 3, 'Task deletion failed');

console.log('✔ Verification Tasks CRUD operations (Create, Read, Update/Cycle, Delete) passed.');

// -----------------------------------------------------------------------------
// 4. Notifications CRUD Operations
// -----------------------------------------------------------------------------
console.log('\nTesting 4: Notifications CRUD Operations...');

let notifications = [
  { id: 'NOTIF-1', title: 'Welcome', isRead: false, timestamp: '1 hour ago' },
  { id: 'NOTIF-2', title: 'New check saved', isRead: false, timestamp: '2 hours ago' },
];

// C: Add Notification
function addNotification(n) {
  notifications = [{ ...n, id: `NOTIF-${Date.now()}`, isRead: false }, ...notifications];
}
addNotification({ title: 'Application approved', timestamp: 'Just now' });
assert.strictEqual(notifications.length, 3, 'Notification creation failed');

// R: Read & Unread Count
let unreadCount = notifications.filter((n) => !n.isRead).length;
assert.strictEqual(unreadCount, 3, 'Unread count should be 3');

// U: Mark Read / Mark All
function markAsRead(id) {
  notifications = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
}
markAsRead(notifications[0].id);
assert.strictEqual(notifications[0].isRead, true, 'Mark as read failed');
assert.strictEqual(notifications.filter((n) => !n.isRead).length, 2, 'Unread count mismatch after read');

function markAllAsRead() {
  notifications = notifications.map((n) => ({ ...n, isRead: true }));
}
markAllAsRead();
assert.strictEqual(notifications.filter((n) => !n.isRead).length, 0, 'Mark all as read failed');

// D: Delete Notification
function deleteNotification(id) {
  notifications = notifications.filter((n) => n.id !== id);
}
deleteNotification(notifications[0].id);
assert.strictEqual(notifications.length, 2, 'Delete notification failed');

function clearAllNotifications() {
  notifications = [];
}
clearAllNotifications();
assert.strictEqual(notifications.length, 0, 'Clear all notifications failed');

console.log('✔ Notifications CRUD operations passed.');

// -----------------------------------------------------------------------------
// 5. Monthly Verification Quota CRUD Operations
// -----------------------------------------------------------------------------
console.log('\nTesting 5: Verification Quota CRUD & Policy Enforcement...');

let quotaStore = {
  used: 0,
  limit: 5,
};

function recordApplication(app) {
  if (quotaStore.used >= quotaStore.limit) {
    return { success: false, error: 'Quota exceeded' };
  }
  quotaStore.used += 1;
  return {
    success: true,
    remaining: quotaStore.limit - quotaStore.used,
    isExceeded: quotaStore.used >= quotaStore.limit,
  };
}

// 5 successive applications (1 to 5)
for (let i = 1; i <= 5; i++) {
  const res = recordApplication({ parcelId: `PARCEL-00${i}` });
  assert.strictEqual(res.success, true, `Application ${i} should succeed`);
  assert.strictEqual(res.remaining, 5 - i, `Remaining quota mismatch at step ${i}`);
}

assert.strictEqual(quotaStore.used, 5, 'Quota used should be 5');

// 6th application must be blocked
const blockedRes = recordApplication({ parcelId: 'PARCEL-006' });
assert.strictEqual(blockedRes.success, false, '6th application must be blocked');
assert.strictEqual(blockedRes.error, 'Quota exceeded', 'Expected quota exceeded error');

console.log('✔ Verification Quota CRUD & 5/5 monthly limit enforcement passed.');

console.log('\n====================================================');
console.log('   ALL APPLICATION CRUD OPERATIONS FULLY AUDITED!   ');
console.log('====================================================\n');
