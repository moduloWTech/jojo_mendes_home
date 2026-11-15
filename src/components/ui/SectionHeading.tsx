import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: HeadingTag = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={cn(
        'mb-7 md:mb-9 xl:mb-12',
        isCenter && 'xl:text-center xl:mx-auto',
        className
      )}
    >
      {eyebrow && (
        <p className="type-eyebrow text-primary mb-2 md:mb-2.5 xl:mb-3">
          {eyebrow}
        </p>
      )}
      <HeadingTag
        id={id}
        className={cn(
          HeadingTag === 'h1' ? 'type-h1' : 'type-h2',
          'text-text'
        )}
      >
        {title}
      </HeadingTag>
      {description && (
        <p
          className={cn(
            'type-body text-text-muted mt-4 md:mt-5 xl:mt-6 max-w-[65ch]',
            isCenter && 'xl:mx-auto'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

