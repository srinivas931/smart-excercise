import React from 'react';
import Hyperlink from 'terra-hyperlink';
import Table from 'terra-table';
import { queryFormatter } from './helpers.js';

const ConditionsTable = ({ conditions }) => (
  <div>
    <Table isStriped={true}>
      <Table.Header>
        <Table.HeaderCell content="Condition Description" key="CONDITION" minWidth="small" />
        <Table.HeaderCell content="Date Recorded" key="DATE_RECORDED" minWidth="small" />
        <Table.HeaderCell content="More information" key="MORE_INFO" minWidth="small" />
      </Table.Header>
        {
          conditions.map(item => (
              <Table.Row key={item.resource.id}>
                <Table.Cell content={item.resource.code.text} />
                <Table.Cell content={item.resource.dateRecorded} />
                <Table.Cell content={<Hyperlink href={conditionDetailsUrl(item.resource.code.text)}>Details</Hyperlink>} />
              </Table.Row>
            ))
        }
    </Table>
  </div>
);

const infoUrl = "https://www.ncbi.nlm.nih.gov/pubmed/?"
const hrefParam = 'term';

const conditionDetailsUrl = (conditionName) => (
  `${infoUrl}${new URLSearchParams(queryFormatter(hrefParam, conditionName))}`
);

export default ConditionsTable;