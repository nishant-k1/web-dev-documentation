import { render } from "@testing-library/react";
import SnapshotTesting from ".";

test("Snapshot Testing", () => {
  const container = render(<SnapshotTesting />);
  expect(container).toMatchSnapshot();
});
