// Debug v2 - try content-manager endpoints (admin API)
const BASE = "http://localhost:1337";
const email = "thefreelance.biz@gmail.com";
const password = "Password123";

async function main() {
  const loginRes = await fetch(`${BASE}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const loginData = await loginRes.json();
  const token = loginData.data.token;
  console.log("✓ Logged in");

  // Try content-manager (admin API)
  const endpoints = [
    `/content-manager/collection-types/api::menu-category.menu-category/actions/new`,
    `/content-manager/collection-types/api::menu-category.menu-category`,
    `/content-manager/content-types/api::menu-category.menu-category/configuration`,
    `/admin/content-manager/collection-types/api::menu-category.menu-category`,
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(`${BASE}${ep}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(`GET ${ep}: ${res.status}`);
    } catch (e) {
      console.log(`GET ${ep}: ERROR ${e.message}`);
    }
  }

  // Try POST via content-manager
  console.log("\n--- POST via content-manager ---");
  const res = await fetch(
    `${BASE}/content-manager/collection-types/api::menu-category.menu-category`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "Test Cat",
        slug: "test",
        order: 99,
      }),
    },
  );
  const body = await res.text();
  console.log(`Status: ${res.status}`);
  console.log(body.substring(0, 400));

  // List admin routes
  console.log("\n--- Check admin API routes ---");
  const routesRes = await fetch(`${BASE}/admin/routes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`GET /admin/routes: ${routesRes.status}`);
  if (routesRes.ok) {
    const routesData = await routesRes.json();
    const apiRoutes =
      routesData.data?.routes?.filter(
        (r) => r.path.includes("menu") || r.path.includes("content"),
      ) || [];
    console.log(`Found ${apiRoutes.length} relevant routes:`);
    apiRoutes
      .slice(0, 10)
      .forEach((r) => console.log(`  ${r.method} ${r.path}`));
  }
}

main().catch(console.error);
