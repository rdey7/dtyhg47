import { Policy } from "../src";
import { expect, test } from "@jest/globals";

type Resources = {
  link: ["create", "read", "update", "delete"];
  team: ["create", "read", "addMember", "delete"];
};

type TenantId = string;
type ResourceId = string;
type GlobalResourceId = `${TenantId}::${keyof Resources}::${ResourceId}`;

test("example", () => {
  const p = new Policy<Resources, GlobalResourceId>({
    resources: {
      link: {
        "planetfall::link::*": ["create", "read"],
        "planetfall::link::/abc": ["delete"],
      },
    },
  });

  /**
   * Reading is allowed for all links
   */
  expect(p.validate(["link:read"], "planetfall::link::/abc")).toEqual({
    valid: true,
  });

  expect(p.validate(["link:delete"], "planetfall::link::/abc")).toEqual({
    valid: true,
  });
});
