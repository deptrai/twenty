import { CommissionsList } from '@/real-estate/components/CommissionsList';
import { mockCommissions } from '@/real-estate/data/sales-tools-mock';
import { PageContainer } from '@/ui/layout/page/components/PageContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #a0a0a0;
  margin: 0;
`;

export const CommissionsPage = () => {
  const { t } = useLingui();

  return (
    <PageContainer>
      <Header>
        <Title>{t`My Commissions`}</Title>
        <Subtitle>{t`Track your commission payments and status`}</Subtitle>
      </Header>
      <CommissionsList commissions={mockCommissions} />
    </PageContainer>
  );
};
