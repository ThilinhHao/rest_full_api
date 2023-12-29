import styled from 'styled-components';
import Pagination from 'antd/lib/pagination';
import { getColorSite, getIconPaginationNext, getIconPaginationPrev } from 'helper/colorSite';
interface IPaginationWrapper {
  absolute?: boolean;
  right?: string;
}

export const PaginationWrapper = styled(Pagination)<IPaginationWrapper>`
  position: ${(props) => (!props?.absolute ? 'absolute' : 'unset')};
  right: ${(props) => (props?.right ? props?.right : '2rem')};
  display: flex;
  flex-direction: row;
  .ant-pagination-item {
    margin-right: 0.75rem;
    margin-left: 0.75rem;
    a {
      height: fit-content;
      color: ${getColorSite()} !important;
      font-size: 1.875rem;
      font-weight: 500;
      margin-top: -1px;
      line-height: 0;
      :hover {
        color: ${getColorSite()};
      }
    }
    width: 2.5rem !important;
    min-width: 2.5rem !important;
    height: 2.5rem !important;
    min-height: 2.5rem !important;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid ${getColorSite()};
    :hover {
      color: white;
      border: 1px solid ${getColorSite()};
    }
  }
  .ant-pagination-item-active {
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${getColorSite()};
    cursor: default;
    a {
      cursor: default !important;
      color: white !important;
    }
  }
  .ant-pagination-item-link {
    width: 2.5rem !important;
    height: 2.5rem !important;
    border-radius: 1.25rem !important;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px solid ${getColorSite()} !important;
    border: none;
    background-repeat: no-repeat;
    background-position: 0.231rem 0.2rem;
    background-size: 1.875rem 2rem;
    &:disabled {
      cursor: default !important;
    }
    span {
      display: none;
    }
  }

  .ant-pagination-next {
    .ant-pagination-item-link {
      margin-left: 0.5rem;
      background-image: url(${getIconPaginationNext()});
    }
  }

  .ant-pagination-prev {
    .ant-pagination-item-link {
      background-image: url(${getIconPaginationPrev});
      transform: rotate(180deg);
      box-shadow: 0px -2px 4px 1px rgba(0, 0, 0, 0.25);
    }
  }
  .ant-pagination-disabled {
    pointer-events: none !important;
    cursor: default !important;
    .ant-pagination-item-link {
      box-shadow: none !important;
      border: none !important;
      background-image: none !important;
    }
  }
  .ant-pagination-jump-prev {
    .ant-pagination-item-link {
      border: none !important;
    }
  }
  .ant-pagination-jump-next {
    .ant-pagination-item-link {
      border: none !important;
    }
  }
  &.pagination-wrapper-error {
    .ant-pagination-item-ellipsis {
      color: rgba(0, 0, 0, 0.25);
    }
    .ant-pagination-item {
      position: relative;
      top: 0;
      left: 0;
    }
    .ant-pagination-next,
    .ant-pagination-prev {
      position: relative;
      top: 0;
      left: 0;
    }
    .icon-error {
      width: 1.813rem;
      height: 1.813rem;
      position: absolute;
      right: -1.2rem;
      top: -1.5rem;
    }
    .ant-pagination-item .pagination-error {
      margin-right: 0.75rem;
      margin-left: 0.75rem;
      width: 2.5rem !important;
      min-width: 2.5rem !important;
      height: 2.5rem !important;
      min-height: 2.5rem !important;
      border-radius: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      /* border: 1px solid rgb(255, 0, 0); */
      a {
        /* color: rgb(255, 0, 0) !important; */
      }
    }
    .ant-pagination-item-active .pagination-error {
      box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
      /* background: rgb(255, 0, 0); */
      cursor: default;
      a {
        cursor: default !important;
        color: white !important;
      }
    }
  }
`;
