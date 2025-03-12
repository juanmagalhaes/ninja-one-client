"use client";

import { cn } from "@/lib/utils";
import {
  ComponentProps,
  createContext,
  forwardRef,
  memo,
  PropsWithChildren,
  Ref,
  useContext,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useMount } from "react-use";

function Component(props: ComponentProps<"div">, ref: Ref<HTMLDivElement>) {
  const { className, ...rest } = props;
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-2 justify-center items-center bg-transparent",
        className,
      )}
      {...rest}
    >
      <span className="sr-only">Loading...</span>
      <div className="h-4 w-4 bg-secondary/80 rounded-full animate-bounce [animation-delay:-0.3s] shadow shadow-muted/50" />
      <div className="h-4 w-4 bg-secondary/85 rounded-full animate-bounce [animation-delay:-0.15s] shadow shadow-muted/50" />
      <div className="h-4 w-4 bg-secondary/90 rounded-full animate-bounce shadow shadow-muted/50" />
    </div>
  );
}

const ForwardRef = forwardRef(Component);

export const ProgressIndicator = memo(ForwardRef);

// Create Context
interface ProgressIndicatorContextProps {
  isProgressing: boolean;
  setProgressVisible: (state: boolean) => void;
}

const ProgressIndicatorContext = createContext<
  ProgressIndicatorContextProps | undefined
>(undefined);

// Wrapper Component to conditionally show the loader globally
function ProgressIndicatorWrapper() {
  const { isProgressing } = useProgressIndicator();
  const [isMounted, setMounted] = useState(false);

  useMount(() => {
    // Ensure the loader only shows on the browser
    setMounted(true);
  });

  if (!isProgressing || !isMounted) return null;

  return createPortal(
    <ProgressIndicator
      id="global_progress_indicator"
      className="right-10 bottom-10 fixed z-[9999]"
    />,
    document.body,
  );
}

// Provider Component
export function ProgressIndicatorProvider({ children }: PropsWithChildren) {
  const [isProgressing, setProgressVisible] = useState(false);
  const contextValue = useMemo(
    () => ({ isProgressing, setProgressVisible }),
    [isProgressing],
  );

  return (
    <ProgressIndicatorContext.Provider value={contextValue}>
      {children}
      <ProgressIndicatorWrapper />
    </ProgressIndicatorContext.Provider>
  );
}

// Hook to use context
export function useProgressIndicator() {
  const context = useContext(ProgressIndicatorContext);
  if (!context) {
    throw new Error(
      "useProgressIndicator must be used within a ProgressIndicatorProvider",
    );
  }
  return context;
}
