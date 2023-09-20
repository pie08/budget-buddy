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
      if (state[action.payload.category]) return state;
      return { ...state, ...action.payload };
    }

    case "updateBudgetCategory": {
      const newState = { ...state };
      const value = newState[action.payload.key];
      delete newState[action.payload.key];
      newState[action.payload.newKey] = value;
      return newState;
    }

    case "updateBudgetAmount": {
      const newState = { ...state };
      newState[action.payload.key] = action.payload.value;
      return newState;
    }

    case "deleteCategoryBudget": {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
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

  const [categoryBudgets, dispatch] = useReducer(
    reducer,
    isUpdateSession ? budget.categories : {}
  );
  const [categoryBudgetsError, setCategoryBudgetsError] = useState("");
  const totalCategoryBudgetAmount = Object.entries(categoryBudgets).reduce(
    (acc, [_, value]) => acc + Number(value),
    0
  );

  const { register, handleSubmit, formState, reset, getValues, watch } =
    useForm({
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
  const spendingLimit = Number(watch("spendingLimit"));

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

  function handleUpdateBudgetCategory(key, newKey) {
    dispatch({ type: "updateBudgetCategory", payload: { key, newKey } });
  }

  function handleAddCategoryBudget(payload) {
    dispatch({ type: "addCategoryBudget", payload });
  }

  function handleUpdateBudgetAmount(key, value) {
    dispatch({ type: "updateBudgetAmount", payload: { key, value } });
  }

  function handleDeleteCategoryBudget(key) {
    dispatch({ type: "deleteCategoryBudget", payload: key });
  }

  // validation
  useEffect(
    function () {
      setCategoryBudgetsError("");

      Object.entries(categoryBudgets).forEach(([category, amount]) => {
        if (+amount <= 0) setCategoryBudgetsError("Amount must be above 0");

        if (categories.filter((el) => el.name === category).length === 0)
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
              handleAddCategoryBudget({ Select: 0 });
            }}
          >
            Add category
          </Button>

          {Object.entries(categoryBudgets).map(([category, amount], i) => (
            <Category key={i}>
              <DeleteButton
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteCategoryBudget(category);
                }}
              >
                <HiXMark />
              </DeleteButton>

              <Select
                value={category}
                onChange={(e) => {
                  e.preventDefault();
                  handleUpdateBudgetCategory(category, e.target.value);
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
                value={amount}
                onChange={(e) => {
                  e.preventDefault();
                  handleUpdateBudgetAmount(category, e.target.value);
                }}
              />
            </Category>
          ))}

          {Object.keys(categoryBudgets).length > 0 && (
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
