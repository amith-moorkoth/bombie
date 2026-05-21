import { updater, remove, get, removeANDupdate } from "../json-handler";

const makeTree = () => [
  {
    id: "root-1",
    label: "Root 1",
    child: [
      {
        id: "child-1a",
        label: "Child 1a",
        child: [{ id: "grandchild-1a-i", label: "GC", child: [] }],
      },
      { id: "child-1b", label: "Child 1b", child: [] },
    ],
  },
  { id: "root-2", label: "Root 2", child: [] },
];

describe("json-handler", () => {
  describe("get", () => {
    it("finds a top-level node by id", () => {
      expect(get(makeTree(), "root-2")).toMatchObject({ label: "Root 2" });
    });

    it("finds a nested node by id", () => {
      expect(get(makeTree(), "grandchild-1a-i")).toMatchObject({ label: "GC" });
    });

    it("returns an empty array when the id is not found", () => {
      expect(get(makeTree(), "missing")).toEqual([]);
    });
  });

  describe("updater", () => {
    it("updates a top-level node's key", () => {
      const tree = makeTree();
      const out = updater(tree, "root-2", "label", "Renamed");
      expect(get(out, "root-2").label).toBe("Renamed");
    });

    it("updates a deeply nested node's key", () => {
      const tree = makeTree();
      updater(tree, "grandchild-1a-i", "label", "Updated GC");
      expect(get(tree, "grandchild-1a-i").label).toBe("Updated GC");
    });

    it("returns the same array reference (mutates in place)", () => {
      const tree = makeTree();
      const out = updater(tree, "root-1", "label", "x");
      expect(out).toBe(tree);
    });
  });

  describe("remove", () => {
    it("removes a top-level node", () => {
      const tree = makeTree();
      remove(tree, "root-2");
      expect(tree.find((n) => n.id === "root-2")).toBeUndefined();
      expect(tree).toHaveLength(1);
    });

    it("removes a nested node", () => {
      const tree = makeTree();
      remove(tree, "child-1a");
      const root1 = tree.find((n) => n.id === "root-1");
      expect(root1.child.find((n) => n.id === "child-1a")).toBeUndefined();
    });

    it("leaves the tree alone when id is not found", () => {
      const tree = makeTree();
      const before = JSON.stringify(tree);
      remove(tree, "missing");
      expect(JSON.stringify(tree)).toBe(before);
    });
  });

  describe("removeANDupdate", () => {
    it("moves a node into a new parent's child list", () => {
      const tree = makeTree();
      const newParent = tree[1]; // root-2, empty child list
      const result = removeANDupdate(tree, "child-1a", newParent);
      // child-1a should be gone from root-1
      expect(get(result, "root-1").child.map((c) => c.id)).not.toContain(
        "child-1a"
      );
      // child-1a should now be under root-2
      expect(get(result, "root-2").child.map((c) => c.id)).toContain(
        "child-1a"
      );
    });

    it("is a no-op when the node is already a direct child of the target", () => {
      const tree = makeTree();
      const root1 = tree[0];
      const result = removeANDupdate(tree, "child-1a", root1);
      expect(result).toBe(tree);
    });
  });
});
