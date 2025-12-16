---
description:
---

# System Verification Workflow

This workflow describes how to manually verify the core functionality of the e-commerce application.

## Prerequisites

- Application is running (`npm run dev`)
- Browser is open to the local server URL (e.g., `http://localhost:5173`)

## Verification Steps

### 1. Home Page

- [ ] Verify navigation bar links work.
- [ ] Verify hero section is visible.
- [ ] Verify featured products are displayed.

### 2. Product Browsing

- [ ] Navigate to "Products" page.
- [ ] Test category filters (e.g., "Industrial Solvents").
- [ ] Test search functionality.
- [ ] Verify pagination works.

### 3. Shopping Cart Flow

- [ ] Click on a product to view details.
- [ ] Click "Add to Cart".
- [ ] Verify cart drawer opens.
- [ ] Verify item is added with correct price.
- [ ] Test increasing/decreasing quantity.

### 4. Checkout Flow

- [ ] Click "Checkout" in the cart drawer.
- [ ] Fill in the required fields (Email, Name, Address).
- [ ] Click "Place Order".
- [ ] Verify success message appears.
- [ ] Verify "Continue Shopping" button redirects to Home.

## Troubleshooting

- If the cart doesn't open, check the console for errors.
- If checkout fails, ensure all required fields are filled.
