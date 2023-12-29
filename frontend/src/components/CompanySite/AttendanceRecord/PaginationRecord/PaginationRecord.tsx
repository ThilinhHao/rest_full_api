/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import { PaginationProps } from 'antd/lib/pagination';
import React, { useState, useRef, useEffect } from 'react';
import { PaginationWrapper } from './paginationRecordStyle';
import images from '@assets/images-base';

interface IPaginationRecord extends PaginationProps {
  noAbsolute?: boolean;
  right?: string;
}

interface PaginationErrorProps extends PaginationProps {
  noAbsolute?: boolean;
  errorArr?: number[];
}
const PaginationRecord = ({ noAbsolute, right, ...props }: IPaginationRecord) => {
  if (props.pageSize && (props.total || props.total === 0) && props.pageSize >= props.total) return <div />;
  return <PaginationWrapper {...props} absolute={noAbsolute} right={right} showSizeChanger={false} />;
};

export const PaginationRecordError = ({ noAbsolute, errorArr, ...props }: PaginationErrorProps) => {
  const refPagination = useRef<any>(null);
  const [dataShow, setDataShow] = useState<number[]>([]);
  const [nextError, setNextError] = useState<boolean>(false);
  const [prevError, setPrevError] = useState<boolean>(false);

  useEffect(() => {
    if (refPagination.current) {
      const titles = Array.from(refPagination.current.querySelectorAll('li')).map((li: any) =>
        li.getAttribute('title')
      );
      let _data: any = [];
      let _dataShow: any = [];
      titles.forEach((number) => {
        if (!Number.isNaN(Number(number)) && errorArr?.includes(Number(number))) {
          _data.push(Number(number));
        }
      });

      titles.forEach((number) => {
        if (!Number.isNaN(Number(number))) {
          _dataShow.push(Number(number));
        }
      });
      setDataShow(_dataShow.sort((a: number, b: number) => a - b));
    }
  }, [errorArr]);

  useEffect(() => {
    errorArr?.forEach((number) => {
      if (number > 1 && number < dataShow[1]) {
        setPrevError(true);
      }
    });

    errorArr?.forEach((number) => {
      if (number < dataShow[dataShow.length - 1] && number > dataShow[dataShow.length - 2]) {
        setNextError(true);
      }
    });
  }, [dataShow, errorArr]);

  const current = props?.current ?? 0;
  if (props.pageSize && (props.total || props.total === 0) && props.pageSize >= props.total) return <div />;

  return (
    <div ref={refPagination}>
      <PaginationWrapper
        className="pagination-wrapper-error"
        {...props}
        absolute={noAbsolute}
        showSizeChanger={false}
        itemRender={(e, type) => {
          if (type === 'next') {
            return (
              <div className="ant-pagination-next">
                {nextError && current < e && (
                  <img className="icon-error" src={images.companySite.errorRed} alt={images.companySite.errorRed} />
                )}
                <span className="ant-pagination-item-link" />
              </div>
            );
          }
          if (type === 'prev') {
            return (
              <div className="ant-pagination-prev">
                {prevError && !!e && (
                  <img className="icon-error" src={images.companySite.errorRed} alt={images.companySite.errorRed} />
                )}
                <span className="ant-pagination-item-link" />
              </div>
            );
          }
          if (type !== 'jump-next' && type !== 'jump-prev') {
            return (
              <div className={errorArr?.includes(e) ? 'pagination-error' : ''}>
                {errorArr?.includes(e) && (
                  <img className="icon-error" src={images.companySite.errorRed} alt={images.companySite.errorRed} />
                )}
                <a rel="nofollow">{e}</a>
              </div>
            );
          }
          return (
            <div>
              <span className="ant-pagination-item-ellipsis">•••</span>
            </div>
          );
        }}
      />
    </div>
  );
};

export default PaginationRecord;
