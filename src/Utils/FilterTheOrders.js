import format from './Format';

export default {
  sortOrderBy: (orders, filter) => {
    if (filter.sortBy === 'id' && filter.sort === 'desc') {
      orders.sort((a, b) => Number(b[filter.sortBy]) - Number(a[filter.sortBy]));
    } else if (filter.sortBy === 'id' && filter.sort === 'asc') {
      orders.sort((a, b) => Number(a[filter.sortBy]) - Number(b[filter.sortBy]));
    } else if (filter.sortBy === 'orderedDate' && filter.sort === 'desc') {
      orders.sort((a, b) => (
        format.formatToDate(a[filter.sortBy]) - format.formatToDate(b[filter.sortBy])));
    } else if (filter.sortBy === 'orderedDate' && filter.sort === 'asc') {
      orders.sort((a, b) => (
        format.formatToDate(b[filter.sortBy]) - format.formatToDate(a[filter.sortBy])
      ));
    }
    return orders;
  },
  searchByText: (order, filter) => {
    if (filter.keyword === '') return order;
    const regex = new RegExp(filter.keyword, 'gi');
    return order.orderItems.filter((menuItem) => (
      menuItem.menu.name.match(regex)
    ));
  },
  filterShowBy: (orders, filter) => {
    if (filter.showBy === '') return orders;
    const regex = new RegExp(filter.showBy, 'gi');
    return orders.filter((trx) => trx.orderItems.filter((menuItem) => (
      menuItem.menu.categoryName.match(regex)
    )));
  },
};
