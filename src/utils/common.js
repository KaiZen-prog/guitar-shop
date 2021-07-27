import {INTERMEDIATE_PAGINATION_VALUE} from "../const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const Repeat = (props) => {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }

  return items;
};

export const generatePagination = (page, length) => {
  const result = [];

  result.push(`1`);

  if (page > INTERMEDIATE_PAGINATION_VALUE) {
    result.push(`...`);
  }

  for (let i = page - 2; i <= page + 2; i++) {
    if (i > 1 && i < length) {
      result.push(String(i));
    }
  }

  if (page < length - INTERMEDIATE_PAGINATION_VALUE + 1) {
    result.push(`...`);
  }

  result.push(String(length));

  return result;
}
