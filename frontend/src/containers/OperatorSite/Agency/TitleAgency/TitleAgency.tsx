import images from '@assets/images-base';
import React from 'react';
import { Require, RowCenter } from 'styles';
import { CONST_COMMON } from 'constants/language';

import { LineTitle, TitleAgencyWrapper, TooltipAccountNameWrapper, TooltipSevenWrapper } from './titleAgencyStyle';
import {
  IconInfo,
  ToolTipSevenShow,
  ToolTipShow,
} from '@containers/CompanySite/SalaryAdvance/salaryAdvanceDetailStyle';
import { getFullHostName } from 'helper';
import configs from 'config';

const ContentTooltip = () => {
  return (
    <>
      <IconInfo
        className="iconInfo"
        src={
          getFullHostName() === configs.APP_FRONTEND_COMPANY
            ? images.companySite.iconInfo
            : images.dealerAgency.question
        }
        alt=""
      />
      <ToolTipShow left="-2.5rem" top="-20rem" className="tooltip" width="44.813rem" height="8.75rem">
        <div className="tooltip-text">
          <div>名義人名に入力可能テキスト：</div>
          <div>■英字</div>
          <div className="content">ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
          <div>■数字</div>
          <div className="content">0123456789</div>
          <div>■カナ文字</div>
          <div className="content">ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ</div>
          <div>■濁音、半濁音</div>
          <div className="content">"ﾞ"（濁音）、"ﾟ"（半濁音）</div>
          <div>■記号</div>
          <div className="content">
            "-"（ハイフン）、"/"（スラッシュ）、"." （ドット）、 ","（カンマ）、"(" 、")"、 "｢"、"｣"、"￥"、半角スペース
          </div>
        </div>
      </ToolTipShow>
    </>
  );
};

export const TooltipAccountName = ({ marginLeft }: { marginLeft?: string }) => {
  return (
    <TooltipAccountNameWrapper marginLeft={marginLeft}>
      <ContentTooltip />
    </TooltipAccountNameWrapper>
  );
};

const ContentSeven = () => {
  return (
    <>
      <IconInfo
        className="iconInfo"
        src={
          getFullHostName() === configs.APP_FRONTEND_COMPANY
            ? images.companySite.iconInfo
            : images.dealerAgency.question
        }
        alt=""
      />
      <ToolTipSevenShow left="-4rem" top="-6rem" className="tooltip" width="20.813rem" height="8.75rem">
        <div className="tooltip-text">
          <div>
            セブン銀行から届く書類の中に「リアルタイム振込サービスについてのご連絡」がございますので
            <br />
            そちらに記載されている「企業コード」を入力してください
          </div>
        </div>
      </ToolTipSevenShow>
    </>
  );
};

export const TooltipSevenUser = ({ marginLeft }: { marginLeft?: string }) => {
  return (
    <TooltipSevenWrapper marginLeft={marginLeft}>
      <ContentSeven />
    </TooltipSevenWrapper>
  );
};

const TitleAgency = ({
  title,
  questionMark,
  width,
  require,
  isAccountName,
  isSevenUser,
}: {
  title: string;
  questionMark?: boolean;
  width?: string;
  require?: boolean;
  isAccountName?: boolean;
  isSevenUser?: boolean;
}) => {
  return (
    <TitleAgencyWrapper>
      <RowCenter>
        <span>
          {title}
          {require && <Require>{CONST_COMMON.REQUIRE}</Require>}
        </span>
        {questionMark && <img className="question-mark" src={images.dealerAgency.question} alt="" />}
        {isAccountName && <TooltipAccountName />}
        {isSevenUser && <TooltipSevenUser />}
      </RowCenter>
      <LineTitle width={width} />
    </TitleAgencyWrapper>
  );
};

export default TitleAgency;
