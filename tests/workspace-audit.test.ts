import { describe, expect, it } from "vitest";
import { auditWorkspaceInput, workspaceAuditTool } from "../app/api/chat/tools";

describe("audit_workspace tool", () => {
  it("accepts a focused audit request", () => {
    expect(auditWorkspaceInput.parse({ focus: "accessibility", includeRecommendations: true })).toEqual({
      focus: "accessibility",
      includeRecommendations: true
    });
  });

  it("rejects an empty focus", () => {
    expect(auditWorkspaceInput.safeParse({ focus: "" }).success).toBe(false);
  });

  it("rejects an overlong focus", () => {
    expect(auditWorkspaceInput.safeParse({ focus: "x".repeat(121) }).success).toBe(false);
  });

  it("returns a higher accessibility score for accessibility audits", async () => {
    const result = await workspaceAuditTool.execute({
      focus: "accessibility",
      includeRecommendations: true
    });
    expect(result.score).toBe(92);
  });

  it("returns typed pass and watch findings", async () => {
    const result = await workspaceAuditTool.execute({
      focus: "performance",
      includeRecommendations: true
    });
    expect(result.findings.map((finding) => finding.status)).toEqual(["pass", "pass", "watch"]);
  });

  it("omits recommendations when disabled", async () => {
    const result = await workspaceAuditTool.execute({
      focus: "performance",
      includeRecommendations: false
    });
    expect(result.recommendations).toEqual([]);
  });
});
