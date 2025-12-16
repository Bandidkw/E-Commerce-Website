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
        path: "products/new",
        name: "AdminProductCreate",
        component: () => import("../views/admin/ProductForm.vue"),
      },
      {
        path: "products/:id",
        name: "AdminProductEdit",
        component: () => import("../views/admin/ProductForm.vue"),
      },
      {
        path: "orders",
        name: "AdminOrders",
        component: () => import("../views/admin/OrderList.vue"),
      },
      {
        path: "settings",
        name: "AdminSettings",
        component: () => import("../views/admin/Settings.vue"),
      },
    ],
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

export default router;
