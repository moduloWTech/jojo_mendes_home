import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'text';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-text-inverse font-bold hover:bg-primary-hover active:scale-[0.99] shadow-card border border-transparent',
  secondary:
    'bg-transparent text-text font-semibold border border-cream-50/70 hover:bg-cream-50/10 hover:border-cream-50 active:scale-[0.99]',
  text: 'bg-transparent text-primary font-semibold underline-offset-4 hover:text-primary-hover hover:underline focus-visible:underline px-0 min-h-[44px]',
};

const sizeStyles =
  'min-h-[52px] xl:min-h-[56px] px-6 md:px-7 xl:px-8 rounded-md text-[15px] leading-[20px] xl:text-[16px] xl:leading-[22px] inline-flex items-center justify-center gap-2 xl:gap-2.5 transition-all duration-150 ease-out select-none disabled:opacity-50 disabled:pointer-events-none';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingText?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      fullWidth = false,
      isLoading = false,
      loadingText,
      className,
      children,
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const base =
      variant === 'text'
        ? 'inline-flex items-center gap-2 text-[15px] xl:text-[16px] transition-colors duration-150 ease-out disabled:opacity-50 disabled:pointer-events-none'
        : sizeStyles;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={cn(
          base,
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
              aria-hidden="true"
            />
            <span>{loadingText ?? children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  external?: boolean;
}

export function ButtonLink({
  href,
  variant = 'primary',
  fullWidth = false,
  external = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const base =
    variant === 'text'
      ? 'inline-flex items-center gap-2 text-[15px] xl:text-[16px] transition-colors duration-150 ease-out'
      : sizeStyles;

  const classes = cn(
    base,
    variantStyles[variant],
    fullWidth && 'w-full',
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export function PrimaryButton(props: Omit<ButtonLinkProps, 'variant'>) {
  return <ButtonLink variant="primary" {...props} />;
}

export function SecondaryButton(props: Omit<ButtonLinkProps, 'variant'>) {
  return <ButtonLink variant="secondary" {...props} />;
}

