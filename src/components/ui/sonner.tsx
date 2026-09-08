import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg-elevated group-[.toaster]:text-text-primary group-[.toaster]:border-border-subtle group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl",
          title: "group-[.toast]:font-medium group-[.toast]:text-text-primary",
          description: "group-[.toast]:text-text-secondary",
          success: "group-[.toast]:border-accent/30",
          error: "group-[.toast]:border-red-400/30",
          closeButton:
            "group-[.toast]:bg-bg-primary group-[.toast]:text-text-tertiary group-[.toast]:border-border-subtle hover:group-[.toast]:text-text-primary",
          actionButton: "group-[.toast]:bg-accent group-[.toast]:text-text-primary",
          cancelButton: "group-[.toast]:bg-bg-primary group-[.toast]:text-text-secondary",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
