import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import type { AssignmentRule } from '../data/lead-distribution-mock';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const StyledRuleCard = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: ${({ theme }) => theme.border.radius.md};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
`;

const StyledRuleHeader = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StyledRuleName = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 18px;
  font-weight: 600;
`;

const StyledStatusBadge = styled.span<{ $active: boolean }>`
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 13px;
  font-weight: 500;
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};

  ${({ $active }) =>
    $active
      ? 'background: rgba(34, 197, 94, 0.1); color: #22c55e;'
      : 'background: rgba(156, 163, 175, 0.1); color: #9ca3af;'}
`;

const StyledRuleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const StyledDetailRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StyledDetailLabel = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.font.color.tertiary};
  min-width: 120px;
`;

const StyledDetailValue = styled.div`
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 13px;
`;

const StyledLogicList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing(5)};
  font-size: 13px;
  color: ${({ theme }) => theme.font.color.secondary};
  list-style: none;

  li {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    position: relative;

    &::before {
      content: '☑';
      position: absolute;
      left: -20px;
      color: #22c55e;
    }
  }
`;

const StyledActions = styled.div`
  border-top: 1px solid ${({ theme }) => theme.border.color.medium};
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(4)};
  padding-top: ${({ theme }) => theme.spacing(4)};
`;

const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
    background: ${theme.background.secondary};
    color: ${theme.font.color.primary};
    border: 1px solid ${theme.border.color.medium};

    &:hover {
      opacity: 0.9;
    }
  `
      : `
    background: transparent;
    color: ${theme.font.color.tertiary};
    border: 1px solid ${theme.border.color.medium};

    &:hover {
      background: ${theme.background.transparent.light};
    }
  `}
`;

const StyledAddButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing(4)} ${theme.spacing(6)}`};
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  color: ${({ theme }) => theme.font.color.primary};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    opacity: 0.9;
  }
`;

interface AssignmentRulesConfigProps {
  rules: AssignmentRule[];
  onEditRule?: (ruleId: string) => void;
  onToggleRule?: (ruleId: string) => void;
  onAddRule?: () => void;
}

export const AssignmentRulesConfig = ({
  rules,
  onEditRule,
  onToggleRule,
  onAddRule,
}: AssignmentRulesConfigProps) => {
  const { t } = useLingui();

  return (
    <StyledContainer>
      {rules.map((rule) => (
        <StyledRuleCard key={rule.id}>
          <StyledRuleHeader>
            <StyledRuleName>
              Rule #{rule.id.split('-')[1]}: {rule.name}
            </StyledRuleName>
            <StyledStatusBadge $active={rule.active}>
              {rule.active ? t`Active` : t`Inactive`}
            </StyledStatusBadge>
          </StyledRuleHeader>

          <StyledRuleDetails>
            <StyledDetailRow>
              <StyledDetailLabel>{t`Priority:`}</StyledDetailLabel>
              <StyledDetailValue>
                {rule.priority} {rule.priority === 0 && t`(Override all)`}
                {rule.priority === 1 && t`(Highest)`}
              </StyledDetailValue>
            </StyledDetailRow>

            <StyledDetailRow>
              <StyledDetailLabel>{t`Applies to:`}</StyledDetailLabel>
              <StyledDetailValue>{rule.applies_to}</StyledDetailValue>
            </StyledDetailRow>

            <StyledDetailRow>
              <StyledDetailLabel>{t`Algorithm:`}</StyledDetailLabel>
              <StyledDetailValue>
                <StyledLogicList>
                  {rule.logic.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </StyledLogicList>
              </StyledDetailValue>
            </StyledDetailRow>
          </StyledRuleDetails>

          <StyledActions>
            <StyledButton
              $variant="primary"
              onClick={() => onEditRule?.(rule.id)}
            >
              {t`Edit Rule`}
            </StyledButton>
            <StyledButton onClick={() => onToggleRule?.(rule.id)}>
              {rule.active ? t`Disable` : t`Enable`}
            </StyledButton>
          </StyledActions>
        </StyledRuleCard>
      ))}

      <StyledAddButton onClick={onAddRule}>+ {t`Add New Rule`}</StyledAddButton>
    </StyledContainer>
  );
};
