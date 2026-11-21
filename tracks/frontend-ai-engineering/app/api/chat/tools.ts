import { z } from "zod";

export const auditWorkspaceInput = z.object({
  focus: z
    .string()
    .min(3)
    .max(120)
    .describe("The frontend area to audit, such as accessibility or performance"),
  includeRecommendations: z.boolean().default(true)
});

export type AuditWorkspaceInput = z.infer<typeof auditWorkspaceInput>;

export type WorkspaceAudit = {
  focus: string;
  score: number;
  findings: Array<{ label: string; detail: string; status: "pass" | "watch" }>;
  recommendations: string[];
};

export const workspaceAuditTool = {
  name: "audit_workspace",
  description: "Audits a frontend workspace focus area and returns typed findings.",
  schema: auditWorkspaceInput,
  async execute(input: AuditWorkspaceInput): Promise<WorkspaceAudit> {
    const focus = input.focus.trim();
    return {
      focus,
      score: focus.toLowerCase().includes("access") ? 92 : 86,
      findings: [
        {
          label: "Semantic structure",
          detail: "Primary content is grouped into landmarks with descriptive headings.",
          status: "pass"
        },
        {
          label: "Responsive behavior",
          detail: "The workspace layout collapses into a single column below tablet width.",
          status: "pass"
        },
        {
          label: `${focus} follow-up`,
          detail: "Run the focused check again after the next production deploy.",
          status: "watch"
        }
      ],
      recommendations: input.includeRecommendations
        ? [
            "Keep the primary action visible without scrolling on narrow screens.",
            "Retest the focused flow with reduced motion and keyboard navigation."
          ]
        : []
    };
  }
};
