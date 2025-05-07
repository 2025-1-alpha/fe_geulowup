import React from 'react';
import clsx from 'clsx';

type StepBarProps = {
  maxStep: number;
  currentStep: number;
};

export function StepBar({ maxStep, currentStep }: StepBarProps) {
  const progress = Math.min(currentStep / maxStep, 1);
  const percent = `${progress * 100}%`;

  return (
    <div className="bg-layout-grey1 relative h-2 w-full overflow-hidden rounded-full">
      <div
        className={clsx(
          'absolute top-0 left-0 h-full rounded-full transition-all duration-300',
          'from-primary-navy3 to-secondary-purple5 bg-gradient-to-r',
        )}
        style={{ width: percent }}
      />
    </div>
  );
}
