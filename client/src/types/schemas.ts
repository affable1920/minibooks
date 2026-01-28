import z from "zod";

const str = z.string();

const orgCreateSchema = z.object({
  businessName: str.min(4, "please type a valid business name"),
  email: z.email(),
  password: str.min(6, "a password must have atleast 6 characters"),
  contact: str.optional(),
  industry: str.optional(),
});

type OrgCreate = z.infer<typeof orgCreateSchema>;

export { orgCreateSchema, type OrgCreate };
