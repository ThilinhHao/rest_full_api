import styled from 'styled-components';
import { colors } from 'constants/colorsBase';
import InputCustom from '@components/Input';

export const StaffUploadCreateWrapper = styled.div`
  padding-top: 0.813rem;
  padding-left: 0.625rem;
  width: 100%;
`;

export const StaffUploadCeateContainer = styled.div`
  padding-left: 4rem;
  padding-right: 2rem;
`;

export const UploadFileCreateWrapper = styled.div`
  text-align: center;

  .box-content {
    .title {
      font-weight: 400;
      font-size: 1.875rem;
      line-height: 2.375rem;
      margin-top: 1.5rem;
      margin-bottom: 3rem;
      /* margin-top: 4.625rem; */
      /* margin-bottom: 6rem; */
    }
    .img-upload {
      display: inline-block;
      position: relative;
      width: 18.063rem;
      height: 18rem;

      &:hover {
        cursor: pointer;
      }
      img,
      svg,
      input[type='file'] {
        width: 100%;
        height: 100%;
      }
      input[type='file'] {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        &:hover {
          cursor: pointer;
        }
      }
    }
    .box-btn-upload {
      position: relative;
      width: fit-content;
      margin: 0 auto;

      input[type='file'] {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        &:hover {
          cursor: pointer;
        }
      }
    }
    .name-file {
      margin-top: 0.3rem;
      font-size: 1.2rem;
    }
    .description {
      margin-top: 4rem;
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.5rem;
    }

    .btn-upload {
      height: auto;
      width: auto;
      padding: 0.375rem 0.688rem;
      background: ${colors.createStaffBtnUpload} !important;
      box-shadow: 0px 5px 5px ${colors.createStaffBoxShadow};
      border-radius: 40px;
      span.label {
        padding-left: 4.313rem;
        padding-right: 7.938rem;
      }
    }

    .box-progress {
      width: 20.063rem;
      height: 20rem;
      background: ${colors.createStaffBackgroundWhite};
      border-radius: 50%;
      border: 5px solid ${colors.createStaffColorNumnberProgress};
      margin: 0 auto;
      margin-bottom: 4.5rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .number-progress {
        font-style: normal;
        font-weight: 700;
        font-size: 5rem;
        line-height: 7.25rem;
        color: ${colors.createStaffColorNumnberProgress};
      }
    }

    .download-template {
      font-weight: 500;
      font-size: 1.375rem;
      line-height: 1.688rem;
      color: ${colors.createStaffColorDescriptionreDownload};
      margin-top: 4rem;
      margin-bottom: 0;
      span,
      a {
        text-decoration: underline;
        text-underline-offset: 0.4rem;
        text-decoration-color: #9f9f9f;
        color: ${colors.createStaffColorTxtDownload};
        margin: 0 0.5rem;
      }
    }
  }
  &.wrapper-upload-file-progress {
    .btn-cancel {
      background: ${colors.createStaffBtnBackgroundCancel};
      box-shadow: 0px 5px 5px ${colors.createStaffBoxShadow};
      border-radius: 40px;
      padding: 0.688rem 3.625rem 0.813rem 3.625rem;
      width: auto;
      height: auto;
      .label {
        font-weight: 500;
        font-size: 2rem;
        line-height: 2.875rem;
        color: ${colors.createStaffColorWhite};
        background: ${colors.createStaffBtnBackgroundCancel};
      }
    }
  }
`;

export const ListStaffUploadWrapper = styled.div`
  .title {
    font-weight: 400;
    font-size: 1.875rem;
    line-height: 2.375rem;
    margin-right: 3.125rem;
  }
  .ant-pagination-options {
    display: none;
  }
  .top-note {
    font-weight: 400;
    font-size: 1.25rem;
    line-height: 1.563rem;
  }
  .paginate {
    margin-top: 2.563rem;
    ul {
      position: inherit;
      text-align: center;
      margin: auto;
      justify-content: center;
      /* li,button {
        width: auto !important;
        height: auto !important;
        min-width: 3rem !important;
        min-height: 3rem !important;
        padding: 0.15rem;
      } */
    }
  }
  .table-list-staff {
    padding-left: 1.188rem;
    padding-right: 1.188rem;
    overflow-x: auto;
    .table {
      display: table;
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 10px;
      font-size: 1.375rem;

      .name {
        /* flex-shrink: 0; */
        padding: 0px 5px;
        width: 14.375rem;
        /* width: 17.375rem; */
        word-wrap: break-word;
      }
      .name_kana {
        /* flex-shrink: 0; */
        padding: 0px 5px;
        width: 16.25rem;
        /* width: 20.25rem; */
        word-wrap: break-word;
      }
      .phone {
        /* flex-shrink: 0; */
        padding: 0px 5px;
        /* width: 16.188rem; */
        width: 9.25rem;
        word-wrap: break-word;
      }
      .email {
        /* flex-shrink: 0; */
        padding: 0px 5px;
        /* width: 19.688rem; */
        width: 18.688rem;
        /* width: 22.688rem; */
        word-wrap: break-word;
      }
      .type {
        /* flex-shrink: 0; */
        padding: 0px 5px;
        /* width: 9.75rem; */
        width: 7rem;
      }
      .amount {
        /* flex-shrink: 0; */
        width: 10.875rem;
        /* width: 7.2rem; */
        word-wrap: break-word;
      }
    }
    .table-row-top,
    .table-row {
      display: flex;
      align-items: center;
    }
    .table-row-top {
      margin-top: 2.5rem;
      font-weight: 400;
      font-size: 1.25rem;
      line-height: 1.563rem;
      color: ${colors.listViewStafTableHeaderColor};
      padding-left: 2.5rem;
    }
    .table-row {
      border: 2px solid ${colors.listViewStafTableHeaderColor};
      border-radius: 10px;
      margin-top: 1.188rem;
      padding: 0.813rem 1rem 0.813rem 2.5rem;
    }
    .border-error {
      border: 2px solid #ff0000;
    }
  }
  .table-list-staff-view {
    .name,
    .name_kana {
      width: 18rem !important;
    }
    .phone {
      width: 16rem !important;
    }
    .email {
      width: 24rem !important;
    }
    .type {
      width: 12rem !important;
    }
  }
  .button-group-list-staff {
    display: flex;
    justify-content: center;
    margin-top: 3.75rem;
    button {
      height: 4.25rem;
      width: 25rem;
      margin: 0 3.125rem;
      border-radius: 2.188rem;

      .label {
        font-weight: 500;
        font-size: 1.75rem;
      }
    }
    .btn-submit {
      padding: 0.188rem 0.313rem 0.313rem 0.313rem;
      background: ${colors.listViewStafBtnSubmit};
      box-shadow: 0px 5px 5px ${colors.listViewStaffBoxShadow};
      justify-content: flex-start;
      height: auto;
      svg {
        width: 3.875rem;
        height: 3.875rem;
        margin-right: 5.813rem;
      }
      .anticon-loading {
        margin-left: 1rem;
        svg {
          width: 2rem;
          height: 2rem;
          margin-right: 0;
        }
      }
    }
    .btn-cancel {
      background: ${colors.listViewStafBtnCancel};
      border: 1px solid ${colors.listViewStafBtnCancelBorder};
      box-shadow: 0px 5px 5px ${colors.listViewStaffBoxShadow};
      color: ${colors.listViewStaffBtnCancelColor};
      .label {
        font-weight: 400;
      }
      &:hover {
        color: ${colors.listViewStaffBtnCancelColor} !important;
      }
    }
  }

  &.wrapper-list-staff-upload-error {
    .table-list-staff {
      padding-left: 1.188rem;
      padding-right: 1.188rem;
      overflow-x: auto;
      .table {
        display: table;
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 10px;

        .name {
          padding: 0px 5px;
          width: 16.375rem;
          /* width: 17.375rem; */
          word-wrap: break-word;
        }
        .name_kana {
          padding: 0px 5px;
          width: 20.25rem;
          word-wrap: break-word;
        }
        .phone {
          padding: 0px 5px;
          width: 16.188rem;
        }
        .email {
          padding: 0px 5px;
          width: 19.688rem;
          word-wrap: break-word;
        }
        .type {
          padding: 0px 5px;
          width: 9.75rem;
        }
        .amount {
          width: 10.875rem;
          .limit1,
          .limit2,
          .ant-input-affix-wrapper {
            height: 2.063rem;
          }
          img {
            width: 1.25rem;
            height: 1.25rem;
          }
          .limit2 {
            margin-top: 0.3rem;
          }
        }
      }
      .table-row-group {
        display: flex;
        align-items: center;

        .col-deleted {
          margin-top: 1.188rem;
          padding-left: 0.5rem;
          .btn-deleted {
            width: 8.188rem;
            height: 3.313rem;
            background: #f65171;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
            border-radius: 25px;
          }
          .btn-restore {
            width: 8.188rem;
            height: 3.313rem;
            background: #47cad2;
            box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);
            border-radius: 25px;
          }
        }
      }
      .table-row-group-deleted {
        color: #b7b7b7;
        .table-row {
          border: 2px solid #b7b7b7;
        }
      }
    }

    .content-error {
      .error-txt-top {
        font-weight: 700;
        font-size: 2rem;
        line-height: 2.438rem;
        color: #ff0000;
        margin: 0;
      }
      .error-txt-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 1.25rem;
        img {
          width: 3.375rem;
          height: 3.375rem;
          margin-right: 0.813rem;
        }
      }
      .paginate-error {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 80%;
        margin: 0 auto;
        list-style: none;
        align-items: center;
        margin-top: 0px;
        padding-left: 0;
        li {
          margin-right: 0.75rem;
          margin-left: 0.75rem;
          border-radius: 2rem;
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          -webkit-box-pack: center;
          justify-content: center;
          box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px;
          border: 1px solid #ff0000;
          /* min-width: 3.2rem;
          min-height: 2.5rem; */

          width: 2.5rem !important;
          min-width: 2.5rem !important;
          height: 2.5rem !important;
          min-height: 2.5rem !important;

          color: #ff0000;
          font-size: 1.875rem;
          margin-top: 1rem;
          div {
            margin-top: -2px;
          }
          &.active {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 4px 4px inset;
            background-color: #ff0000;
            color: white;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export const InputUploadFile = styled(InputCustom)`
  padding: 0px 1.8rem 0 0;
  img {
    width: 1.813rem;
    height: 1.813rem;
  }
  .ant-input-prefix {
    width: 2.125rem;
  }
  input.ant-input {
    font-size: 1.375rem;
    line-height: 2.75rem;
  }
  &.input-fee {
    .ant-input-prefix {
      width: 1.4rem !important;
    }
  }
`;

export const DropdownCustomIcon = styled.div`
  position: relative;

  .ant-select-selector {
    .ant-select-selection-item {
      padding-left: 1.4rem !important;
    }
  }
`;

export const PrefixImg = styled.img`
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.813rem;
  height: 1.813rem;
`;

export const UploadSuccessWapper = styled.div`
  .messsage {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 13rem;
    margin-bottom: 13rem;
    .txt-message {
      margin-right: 1.5rem;
      font-size: 1.875rem;
      line-height: 2.688rem;
    }
  }
  &.wrapper-success-staff-upload {
    .btn-submit {
      height: 4.25rem;
      width: 25rem;
      border-radius: 2.188rem;
      text-align: center;

      padding: 0.25rem 0.313rem 0.313rem 0.425rem;
      background: ${colors.listViewStafBtnSubmit};
      box-shadow: 0px 5px 5px ${colors.listViewStaffBoxShadow};
      justify-content: flex-start;
      height: auto;
      img {
        width: 3.75rem;
        height: 3.75rem;
        margin-right: 5rem;
      }
      .label {
        font-weight: 500;
        font-size: 1.75rem;
      }
    }
  }
`;
