import { useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import { Button } from "../../components/ui/Button";
import expenseCategories from "../../data/expenseCategories.json";
import { getCategories } from "../categories/getCategories";
import { useEffect, useReducer, useState } from "react";
import Select from "../../components/form/Select";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { isAfter } from "date-fns";
import { useCreateBudget } from "./useCreateBudget";
import { useUpdateBudget } from "./useUpdateBudget";

const AddCategories = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Category = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  & input {
    flex-grow: 1;
  }
`;

const Amount = styled.p`
  color: var(--color-gray-400);
  font-weight: 500;
`;

const DeleteButton = styled.button`
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

function reducer(state, action) {
  switch (action.type) {
    case "addCategoryBudget": {
      const filteredState = state.filter(
        (cur) => cur.category !== action.payload.category
      );
      return [...filteredState, action.payload];
    }

    case "updateCategoryBudget": {
      return state
        .filter((budget) => budget.category !== action.payload.category)
        .map((budget, i) => (i !== action.index ? budget : action.payload));
    }

    case "deleteCategoryBudget": {
      return state.toSpliced(action.payload, 1);
    }

    default:
      return state;
  }
}

function BudgetForm({ onCloseModal, budget }) {
  const isUpdateSession = Boolean(budget);

  const { updateBudget, isUpdating } = useUpdateBudget();
  const { createBudget, isCreating } = useCreateBudget();
  const isLoading = isCreating || isUpdating;

  const [categoryBudgets, dispatch] = useReducer(reducer, []);
  const [categoryBudgetsError, setCategoryBudgetsError] = useState("");
  const totalCategoryBudgetAmount = categoryBudgets.reduce(
    (acc, cur) => acc + +cur.amount,
    0
  );

  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: isUpdateSession
      ? Object.assign(
          {},
          budget,
          {
            startDate: (budget.startDate = budget.startDate.split("T")[0]),
          },
          {
            endDate: (budget.endDate = budget.endDate.split("T")[0]),
          }
        )
      : {},
  });
  const { errors } = formState;
  const spendingLimit = Number(getValues("spendingLimit"));

  const categories = getCategories(
    "customExpenseCategories",
    expenseCategories
  );

  function onSubmit(data) {
    if (categoryBudgetsError) return;

    // create budget data
    const newBudget = {
      ...data,
      categories: categoryBudgets,
    };
    if (isUpdateSession) {
      updateBudget(
        { data: newBudget, id: budget.id },
        {
          onSuccess: () => {
            onCloseModal();
          },
        }
      );
    } else {
      createBudget(newBudget, {
        onSuccess: () => {
          onCloseModal();
        },
      });
    }
  }

  function handleUpdateCategoryBudget(index, payload) {
    dispatch({ type: "updateCategoryBudget", payload, index });
  }

  function handleAddCategoryBudget(payload) {
    dispatch({ type: "addCategoryBudget", payload });
  }

  function handleDeleteCategoryBudget(index) {
    dispatch({ type: "deleteCategoryBudget", payload: index });
  }

  // validation
  useEffect(
    function () {
      setCategoryBudgetsError("");

      categoryBudgets.forEach((el, i) => {
        if (+el.amount <= 0) setCategoryBudgetsError("Amount must be above 0");

        if (
          categories.filter((category) => category.name === el.category)
            .length === 0
        )
          setCategoryBudgetsError("Must select a category");
      });

      if (totalCategoryBudgetAmount > spendingLimit)
        setCategoryBudgetsError(
          "Category budgets exceeds total spending limit"
        );
    },
    [categoryBudgets, categories, spendingLimit, totalCategoryBudgetAmount]
  );

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Title" error={errors.title?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="title"
          {...register("title", {
            required: "This field is required",
            maxLength: {
              value: 20,
              message: "Too long!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors.description?.message}>
        <Input
          disabled={isLoading}
          type="text"
          id="description"
          {...register("description", {
            maxLength: {
              value: 200,
              message: "Too long!",
            },
          })}
        />
      </FormRow>

      <FormRow label="Start date" error={errors.startDate?.message}>
        <Input
          disabled={isLoading}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors.endDate?.message}>
        <Input
          disabled={isLoading}
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
            validate: (value) => {
              const startDate = new Date(getValues("startDate"));
              return (
                isAfter(new Date(value), startDate) ||
                "Must be after start date"
              );
            },
          })}
        />
      </FormRow>

      <FormRow label="Spending limit" error={errors.spendingLimit?.message}>
        <Input
          disabled={isLoading}
          type="number"
          id="spendingLimit"
          {...register("spendingLimit", {
            required: "This field is required",
          })}
        />
      </FormRow>

      {/* These are not controlled by react hook form */}
      <FormRow label="Add categories" error={categoryBudgetsError}>
        <AddCategories>
          <Button
            $size="small"
            $variation="secondary"
            onClick={(e) => {
              e.preventDefault();
              handleAddCategoryBudget({ category: "Select...", amount: 0 });
            }}
          >
            Add category
          </Button>

          {categoryBudgets.map((budget, i) => (
            <Category key={i}>
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCategoryBudget(i);
                }}
              >
                <HiXMark />
              </DeleteButton>

              <Select
                value={budget.category}
                onChange={(e) => {
                  e.preventDefault();
                  handleUpdateCategoryBudget(i, {
                    category: e.target.value,
                    amount: budget.amount,
                  });
                }}
              >
                <option value="">Select...</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.name}>
                    {category.name[0].toUpperCase() + category.name.slice(1)}
                  </option>
                ))}
              </Select>

              <Input
                type="number"
                placeholder="Enter amount"
                value={budget.amount}
                onChange={(e) => {
                  e.preventDefault();
                  handleUpdateCategoryBudget(i, {
                    category: budget.category,
                    amount: e.target.value,
                  });
                }}
              />
            </Category>
          ))}

          {categoryBudgets.length > 0 && (
            <Amount>
              {totalCategoryBudgetAmount} / {spendingLimit}
            </Amount>
          )}
        </AddCategories>
      </FormRow>

      <FormRow type="buttons">
        <Button $variation="secondary" type="reset" onClick={reset}>
          Reset
        </Button>
        <Button>Add budget</Button>
      </FormRow>
    </Form>
  );
}

export default BudgetForm;
