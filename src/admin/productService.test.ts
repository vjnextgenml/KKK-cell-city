import { beforeEach, describe, expect, it } from "vitest";
import { adminProductService, resetAdminProductData } from "./productService";
import type { AccessoryDraft, MobilePhoneDraft } from "./types";
import { validateImage, validateProduct } from "./validation";

const mobileDraft: MobilePhoneDraft = {
  productType: "mobile",
  name: "Test Phone",
  model: "TP-1",
  brand: "Test",
  category: "Smartphones",
  price: 25000,
  offer: { enabled: true, originalPrice: 30000, label: "Intro offer" },
  availability: "In stock",
  description: "Test description",
  specifications: [{ id: "display", name: "Display", value: "6.5 inch" }],
  images: [null, null, null],
};

const accessoryDraft: AccessoryDraft = {
  productType: "accessory",
  accessoryType: "Charger",
  name: "Test Charger",
  brand: "Test",
  category: "Chargers & Data Cables",
  price: 1200,
  offer: { enabled: false, label: "" },
  availability: "Unknown",
  description: "",
  specifications: [],
  images: [null],
};

describe("admin product service", () => {
  beforeEach(() => resetAdminProductData());

  it("supports in-memory mobile phone and accessory CRUD", async () => {
    const originalPhoneCount = (await adminProductService.getMobilePhones()).length;
    const originalAccessoryCount = (await adminProductService.getAccessories()).length;

    const phone = await adminProductService.createMobilePhone(mobileDraft);
    expect(await adminProductService.getMobilePhoneById(phone.id)).toMatchObject({
      name: "Test Phone",
      images: [null, null, null],
    });
    expect(await adminProductService.updateMobilePhone(phone.id, {
      ...mobileDraft,
      name: "Updated Test Phone",
    })).toMatchObject({ name: "Updated Test Phone" });
    expect(await adminProductService.deleteMobilePhone(phone.id)).toBe(true);
    expect(await adminProductService.getMobilePhoneById(phone.id)).toBeNull();

    const accessory = await adminProductService.createAccessory(accessoryDraft);
    expect(await adminProductService.getAccessoryById(accessory.id)).toMatchObject({
      name: "Test Charger",
      images: [null],
    });
    expect(await adminProductService.updateAccessory(accessory.id, {
      ...accessoryDraft,
      name: "Updated Test Charger",
    })).toMatchObject({ name: "Updated Test Charger" });
    expect(await adminProductService.deleteAccessory(accessory.id)).toBe(true);

    expect((await adminProductService.getMobilePhones()).length).toBe(originalPhoneCount);
    expect((await adminProductService.getAccessories()).length).toBe(originalAccessoryCount);
  });

  it("preserves the source-defined specs and values on existing accessory records", async () => {
    const powerBank = await adminProductService.getAccessoryById("dummy-power-bank-2");
    expect(powerBank?.specifications).toEqual([
      { id: "Capacity-0", name: "Capacity", value: "6000mAh", isDefault: true },
      { id: "Output-1", name: "Output", value: "18W", isDefault: true },
      { id: "Weight-2", name: "Weight", value: "Lightweight design", isDefault: true },
    ]);
  });

  it("rejects offer prices above the original price", () => {
    expect(validateProduct({
      ...mobileDraft,
      price: 31000,
      offer: { enabled: true, originalPrice: 30000, label: "" },
    })).toMatchObject({
      originalPrice: "Offer price cannot be greater than the original price.",
    });
  });

  it("rejects empty or duplicate custom specification names", () => {
    expect(validateProduct({
      ...mobileDraft,
      specifications: [
        ...mobileDraft.specifications,
        { id: "empty", name: " ", value: "", isDefault: false },
        { id: "duplicate", name: "storage (gb)", value: "256", isDefault: false },
      ],
    })).toMatchObject({
      "specification-empty": "Additional specification names cannot be empty.",
      "specification-duplicate": "Specification names must be unique.",
    });
  });

  it("validates image MIME types and size", () => {
    const validImage = new File(["image"], "photo.png", { type: "image/png" });
    const invalidImage = new File(["text"], "notes.txt", { type: "text/plain" });
    expect(validateImage(validImage).valid).toBe(true);
    expect(validateImage(invalidImage)).toMatchObject({ valid: false });
  });
});
