"use client";

import dynamic from "next/dynamic";

/**
 * Load the Map component dynamically with ssr:false, so Next.js never
 * renders it on the server, where the `window` object does not exist.
 * The `loading` option renders a placeholder while the browser fetches it.
 */
const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <p style={{ padding: "2rem" }}>Loading map…</p>,
});

/**
 * MapView
 * A thin client-side wrapper whose only job is to perform the
 * browser-only import of the Map component. It exists because
 * `ssr: false` is not allowed inside a Server Component.
 */
export default function MapView() {
  return <Map />;
}
