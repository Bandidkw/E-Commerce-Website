import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: Home,
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
      {
        path: "products",
        name: "Products",
        component: () => import("../views/Products.vue"),
      },
      {
        path: "products/:id",
        name: "ProductDetail",
        component: () => import("../views/ProductDetail.vue"),
      },
      {
        path: "downloads",
        name: "Downloads",
        component: () => import("../views/Downloads.vue"),
      },
      {
        path: "blog",
        name: "Blog",
        component: () => import("../views/Blog.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        component: () => import("../views/Contact.vue"),
      },
      {
        path: "checkout",
        name: "Checkout",
        component: () => import("../views/Checkout.vue"),
      },
      {
        path: "request-quotation",
        name: "RequestQuotation",
        component: () => import("../views/RequestQuotation.vue"),
      },
      {
        path: "account",
        component: () => import("../layouts/AccountLayout.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            redirect: "/profile",
          },
          {
            path: "/profile",
            name: "Profile",
            component: () => import("../views/Profile.vue"),
          },
          {
            path: "/orders",
            name: "Orders",
            component: () => import("../views/Orders.vue"),
          },
        ],
      },
      {
        path: ":pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "AdminDashboard",
        component: () => import("../views/admin/Dashboard.vue"),
      },
      {
        path: "products",
        name: "AdminProducts",
        component: () => import("../views/admin/ProductList.vue"),
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: () => import("../views/admin/OrderList.vue"),
      },
      {
        path: "quotations",
        name: "AdminQuotations",
        component: () => import("../views/admin/QuotationList.vue"),
      },
      {
        path: "quotations/new",
        name: "AdminQuotationCreate",
        component: () => import("../views/admin/QuotationForm.vue"),
      },
      {
        path: "quotations/:id",
        name: "AdminQuotationEdit",
        component: () => import("../views/admin/QuotationForm.vue"),
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("../views/admin/Settings.vue"),
      },
    ],
    meta: { requiresAdmin: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
  const isAdminAuthenticated = localStorage.getItem("admin_token") === "true";
  const isUserAuthenticated = localStorage.getItem("user") !== null;

  if (requiresAdmin && !isAdminAuthenticated) {
    // Redirect to admin login if trying to access admin page without admin token
    next({ name: "Login" });
  } else if (requiresAuth && !isUserAuthenticated) {
    // Redirect to home if trying to access profile/auth page without user login
    // The user can then open the login modal from the header
    next({ name: "Home" });
  } else if (to.name === "Login" && isAdminAuthenticated) {
    // If already logged in as admin, don't show admin login page
    next({ name: "AdminDashboard" });
  } else {
    next();
  }
});

export default router;
