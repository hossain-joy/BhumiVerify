import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  id: string | number;
  label: string;
  sublabel?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStepIndex: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStepIndex,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    isCompleted
                      ? 'bg-gov-primary text-white'
                      : isCurrent
                      ? 'bg-gov-primary ring-4 ring-gov-lightTeal text-white'
                      : 'bg-slate-100 text-slate-500 border border-slate-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                </div>
                <div className="text-center mt-2">
                  <p
                    className={`text-xs font-medium ${
                      isCurrent
                        ? 'text-gov-primary font-semibold'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.sublabel && (
                    <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                      {step.sublabel}
                    </p>
                  )}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-2 -mt-5 transition-colors ${
                    idx < currentStepIndex ? 'bg-gov-primary' : 'bg-slate-200'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
