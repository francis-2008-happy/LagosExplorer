import MapView from "@/components/MapView";

/**
 * Home
 * The site's home page. This is a Server Component (no "use client"),
 * so it renders on the server and simply hands off to the
 * client-only MapView.
 */
export default function Home() {
  return (
    <main>
      <MapView />
    </main>
  );
}
