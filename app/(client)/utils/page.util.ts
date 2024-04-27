import { pages, unknowPage } from "@/app/(client)/constants/page.constant";
import PageModel from "../models/page.model";


const findPageByLabels = (labels: string[]): PageModel[] => {
  const results: PageModel[] = [];
  labels.forEach((label) => {
    const result = findPage(label);
    results.push(result);
  });

  return results;
};

const findPageByLabel = (label: string): PageModel => {
  return findPage(label);
};

const findPage = (label: string): PageModel => {
  const foundPage: PageModel =
    pages.find((page) => page.label.toLocaleLowerCase().includes(label.toLocaleLowerCase())) ??
    unknowPage;

  return foundPage;
};

export { findPageByLabels, findPageByLabel };