import {
  DeveloperBoard24Regular,
  LockClosed24Regular,
  Storage24Regular,
  Database20Regular,
  NumberSymbol24Filled,
} from "@vicons/fluent";
import { VmdkDisk } from "@vicons/carbon";
import { Binary, SortAscendingNumbers, ListSearch } from "@vicons/tabler";

const routeGroupIcons = {
  "Searching Algorithms": ListSearch,
  "Sorting Numbers": SortAscendingNumbers,
  "Number Theory": NumberSymbol24Filled,
  "CPU Scheduling": DeveloperBoard24Regular,
  "Deadlock Management": LockClosed24Regular,
  "Memory Management": Storage24Regular,
  "Virtual Memory Management": Database20Regular,
  "Disk Scheduling": VmdkDisk,
};

export const getGroupIcon = (groupName) => {
  const icon = routeGroupIcons?.[groupName];
  return icon || Binary;
};
