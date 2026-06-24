"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Generic client data-fetching hook with loading / error state and a
 * `refetch` for retry buttons.
 *
 * Pass a primitive `key` (e.g. a billing cycle) to re-run the fetcher when it
 * changes. `loading` is *derived* — it's true whenever the resolved result
 * doesn't yet correspond to the current key/refetch token — so we never call
 * setState synchronously inside an effect.
 *
 * Set `keepPreviousData` to keep the last successfully resolved data on screen
 * while a new key is loading (instead of returning null). Handy for tab/toggle
 * UIs that should swap smoothly rather than flash a loading state.
 */
export function useFetch<T>(
  fetcher: () => Promise<T>,
  key?: string | number,
  keepPreviousData = false,
): FetchState<T> & { refetch: () => void } {
  const [nonce, setNonce] = useState(0);
  const token = `${key ?? ""}:${nonce}`;

  const [resolved, setResolved] = useState<{
    token: string;
    data: T | null;
    error: string | null;
  }>({ token: "", data: null, error: null });

  // Keep the latest fetcher in a ref (updated in an effect, not during render)
  // so the data effect can depend only on `token`, not on the fetcher's
  // ever-changing identity.
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  useEffect(() => {
    let active = true;
    fetcherRef
      .current()
      .then((data) => {
        if (active) setResolved({ token, data, error: null });
      })
      .catch((err: unknown) => {
        if (active)
          setResolved({
            token,
            data: null,
            error: err instanceof Error ? err.message : "Failed to load.",
          });
      });
    return () => {
      active = false;
    };
  }, [token]);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  const settled = resolved.token === token;
  return {
    // While loading a new key, keepPreviousData surfaces the last resolved data
    // (which `resolved` still holds) so the UI can cross-fade instead of blank.
    data: settled || keepPreviousData ? resolved.data : null,
    error: settled ? resolved.error : null,
    loading: !settled,
    refetch,
  };
}
