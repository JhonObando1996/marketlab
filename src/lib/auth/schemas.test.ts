import { describe, expect, it } from "vitest";

import { parseSignUpForm, signUpSchema } from "@/lib/auth/schemas";

describe("signUpSchema", () => {
  it("requires first and last name", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "secret12",
      firstName: "",
      lastName: "Lab",
    });

    expect(result.success).toBe(false);
  });

  it("accepts valid signup input", () => {
    const result = signUpSchema.safeParse({
      email: "user@example.com",
      password: "secret12",
      firstName: "Ada",
      lastName: "Lovelace",
    });

    expect(result.success).toBe(true);
  });
});

describe("parseSignUpForm", () => {
  it("reads first and last name from form data", () => {
    const formData = new FormData();
    formData.set("email", "user@example.com");
    formData.set("password", "secret12");
    formData.set("firstName", "Ada");
    formData.set("lastName", "Lovelace");

    const result = parseSignUpForm(formData);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.firstName).toBe("Ada");
      expect(result.data.lastName).toBe("Lovelace");
    }
  });
});
