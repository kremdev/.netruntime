// hooks/useReadLineDetection.ts

import { useMemo } from "react";

export const useReadLineDetection = (code: string): boolean => {
  return useMemo(() => /Console\s*\.\s*ReadLine\s*\(/i.test(code), [code]);
};
