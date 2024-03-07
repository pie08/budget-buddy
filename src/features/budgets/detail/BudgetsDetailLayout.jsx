import Heading from "../../../components/ui/Heading";
import { useBudget } from "../useBudget";
import { getStatus } from "../getStatus";
import { Row } from "../../../components/ui/Row";
import BackButton from "../../../components/ui/BackButton";
import styled, { css } from "styled-components";
import Tag from "../../../components/ui/Tag";
import { format, isAfter, isBefore, isSameDay } from "date-fns";
import { formatCurrency } from "../../../utils/helpers";
import ProgressBar from "@ramonak/react-progress-bar";
import { useExpenses } from "../../expenses/useExpenses";
import BudgetDetailCategories from "./BudgetDetailCategories";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import SpinnerFullPage from "../../../components/ui/SpinnerFullPage";

const HeadingGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;
`;

const HeadingRow = styled(Row)`
  margin-bottom: 1.2rem;
`;

const DatesRow = styled(Row)`
  margin-bottom: 2.4rem;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--color-gray-500);
  margin-bottom: 3.2rem;
`;

const SpendingLimit = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  color: var(--color-blue-600);
  ${(props) =>
    props.$overbudget &&
    css`
      color: var(--color-red-700);
    `}
`;

const Dates = styled.div`
  font-size: 1.4rem;
  color: var(--color-gray-500);
`;

const OverBudgetLabel = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.4rem;
  color: var(--color-red-700);
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
  }
`;

const ProgressLabel = styled.p`
  text-align: center;
  font-size: 1.6rem;
  margin-top: 0.6rem;
  margin-bottom: 6.4rem;
`;

function BudgetsDetail() {
  const { budget, isLoading: isLoadingBudgets } = useBudget();
  const { expenses, isLoading: isLoadingExpenses } = useExpenses();
  const isLoading = isLoadingBudgets || isLoadingExpenses;

  if (isLoading) return <SpinnerFullPage />;

  const {
    title,
    description,
    spendingLimit,
    categories: categoryBudgets,
    startDate,
    endDate,
  } = budget;

  // get all expenses between start and end dates
  const expensesDuringBudget = expenses.filter((expense) => {
    const createdAt = new Date(expense.created_at);

    if (
      (isAfter(createdAt, new Date(startDate)) ||
        isSameDay(createdAt, new Date(startDate))) &&
      (isBefore(createdAt, new Date(endDate)) ||
        isSameDay(createdAt, new Date(endDate)))
    )
      return expense;
  });

  const spent = expensesDuringBudget.reduce((acc, cur) => acc + cur.amount, 0);
  const isOverBudget = spent > spendingLimit;

  const status = getStatus(budget);
  const statusToColor = {
    active: {
      $backgroundColor: "var(--color-brand-100)",
      $textColor: "var(--color-brand-700)",
    },
    waiting: {
      $backgroundColor: "var(--color-yellow-100)",
      $textColor: "var(--color-yellow-700)",
    },
    completed: {
      $backgroundColor: "var(--color-gray-100)",
      $textColor: "var(--color-gray-700)",
    },
  };

  return (
    <div>
      <HeadingRow>
        <HeadingGroup>
          <Heading>{title}</Heading>

          <Tag {...statusToColor[status]}>{status}</Tag>
        </HeadingGroup>
        <BackButton />
      </HeadingRow>
      <Description>{description}</Description>

      <SpendingLimit $overbudget={isOverBudget}>
        {formatCurrency(spendingLimit)}
      </SpendingLimit>
      <DatesRow>
        <Dates>
          {format(new Date(startDate), "PPP")} &mdash;{" "}
          {format(new Date(endDate), "PPP")}
        </Dates>
        {isOverBudget && (
          <OverBudgetLabel>
            <HiOutlineExclamationCircle /> You have gone over budget
          </OverBudgetLabel>
        )}
      </DatesRow>

      <ProgressBar
        completed={spent}
        maxCompleted={spendingLimit}
        isLabelVisible={false}
        animateOnRender={true}
        bgColor="var(--color-blue-600)"
        baseBgColor="var(--color-gray-100)"
        {...(isOverBudget ? { bgColor: "var(--color-red-700)" } : {})}
      />
      <ProgressLabel>
        {formatCurrency(spent)} / {formatCurrency(spendingLimit)}
      </ProgressLabel>

      <BudgetDetailCategories
        categoryBudgets={categoryBudgets}
        expenses={expensesDuringBudget}
      />
    </div>
  );
}

export default BudgetsDetail;
