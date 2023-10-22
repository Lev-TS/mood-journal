import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Page from "../app/page";

vi.mock("@clerk/nextjs", () => {
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: "user_2NNEqL2nrlksjdflkjsdflkj" })
      ),
    ClerkProvider: ({ children }) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: "user_2NNEqL2nrlksjdflkjsdflkj",
        fullName: "Leo Ridze",
      },
    }),
  };

  return mockedFunctions;
});

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ className: "inter" }),
  };
});

test(`Home`, async () => {
  render(await Page());
  expect(screen.getByText("The best Journal app, period.")).toBeTruthy();
});
