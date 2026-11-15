import { describe, expect, it } from "vitest";
import {
  getAccessoryTypes,
  getDefaultSpecificationNames,
  getDefaultSpecifications,
  switchAccessorySpecifications,
} from "./specificationDefaults";

describe("category-specific default specifications", () => {
  it("uses the three existing mobile detail section labels", () => {
    expect(getDefaultSpecificationNames("mobile", "Smartphones")).toEqual([
      "Storage (GB)",
      "Colours",
      "Mobile Specifications",
    ]);
  });

  it.each([
    ["Chargers & Data Cables", "Charger", ["Type", "Output", "Compatibility"]],
    ["Chargers & Data Cables", "Data Cable", ["Type", "Length", "Compatibility"]],
    ["Headphones & Speakers", "Headphones", ["Type", "Battery", "Connectivity"]],
    ["Headphones & Speakers", "Neckband", ["Type", "Battery", "Features"]],
    ["Headphones & Speakers", "Bluetooth Speaker", ["Type", "Volume", "Battery"]],
    ["Power Banks", "Power Bank", ["Capacity", "Output", "Ports"]],
    ["Cases & Screen Guards", "Mobile Case", ["Type", "Material", "Fit"]],
    ["Cases & Screen Guards", "Screen Guard", ["Type", "Protection", "Finish"]],
    ["Smartwatches", "Smartwatch", ["Display", "Battery", "Tracking"]],
  ] as const)(
    "loads existing specs for %s / %s",
    (category, accessoryType, expectedNames) => {
      expect(
        getDefaultSpecificationNames("accessory", category, accessoryType),
      ).toEqual(expectedNames);
    },
  );

  it("updates accessory product types by selected existing category", () => {
    expect(getAccessoryTypes("Chargers & Data Cables")).toEqual([
      "Charger",
      "Data Cable",
      "Wireless Charger",
    ]);
    expect(getAccessoryTypes("Power Banks")).toEqual(["Power Bank"]);
  });

  it("preserves values by specification name and never treats default fields as optional", () => {
    expect(
      getDefaultSpecifications("accessory", "Power Banks", "Power Bank", [
        { id: "capacity", name: "Capacity", value: "5000mAh" },
        { id: "custom", name: "Custom", value: "Saved value", isDefault: false },
      ]),
    ).toEqual([
      { id: "capacity", name: "Capacity", value: "5000mAh", isDefault: true },
      { id: "default:Output", name: "Output", value: "", isDefault: true },
      { id: "default:Ports", name: "Ports", value: "", isDefault: true },
    ]);
  });

  it("replaces defaults when changing accessory type without carrying values across types", () => {
    const switched = switchAccessorySpecifications(
      [
        { id: "type", name: "Type", value: "USB-C fast charger", isDefault: true },
        { id: "output", name: "Output", value: "20W", isDefault: true },
        { id: "compatibility", name: "Compatibility", value: "Android + iPhone", isDefault: true },
        { id: "custom", name: "Warranty", value: "1 year", isDefault: false },
      ],
      "Chargers & Data Cables",
      "Charger",
      "Chargers & Data Cables",
      "Data Cable",
    );

    expect(switched).toEqual([
      { id: "default:Type", name: "Type", value: "", isDefault: true },
      { id: "default:Length", name: "Length", value: "", isDefault: true },
      { id: "default:Compatibility", name: "Compatibility", value: "", isDefault: true },
      { id: "custom", name: "Warranty", value: "1 year", isDefault: false },
    ]);
  });
});
