import { useForm } from "react-hook-form";
import Form from "../../components/form/Form";
import FormRow from "../../components/form/FormRow";
import Input from "../../components/form/Input";
import { Button } from "../../components/ui/Button";
import expenseCategories from "../../data/expenseCategories.json";
import { getCategories } from "../categories/getCategories";
import { useEffect, useReducer, useState } from "react";
import { isAfter } from "date-fns";
import { useCreateBudget } from "./useCreateBudget";
import { useUpdateBudget } from "./useUpdateBudget";
import BudgetAddCategories from "./BudgetAddCategories";

// todo: refactor this file

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

    case "reset":
      return {};

    default:
      return state;
  }
}

function BudgetForm({ onCloseModal, budget }) {
  // if we are currently editing a budget
  const isUpdateSession = Boolean(budget);

  const { updateBudget, isUpdating } = useUpdateBudget();
  const { createBudget, isCreating } = useCreateBudget();
  const isLoading = isCreating || isUpdating;

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

  // Object state, stores categories as keys, amounts as values
  const [categoryBudgets, dispatch] = useReducer(
    reducer,
    isUpdateSession ? budget.categories : {}
  );
  const [categoryBudgetsError, setCategoryBudgetsError] = useState("");

  // calculate total budget for categories
  const totalCategoryBudgetAmount = Object.entries(categoryBudgets).reduce(
    (acc, [_, value]) => acc + Number(value),
    0
  );

  // get all expense categories
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

      {/* NOT controlled by react hook form */}
      <FormRow label="Add categories" error={categoryBudgetsError}>
        <BudgetAddCategories
          dispatch={dispatch}
          categories={categories}
          categoryBudgets={categoryBudgets}
          totalCategoryBudgetAmount={totalCategoryBudgetAmount}
          spendingLimit={spendingLimit}
        />
      </FormRow>

      <FormRow type="buttons">
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => {
            reset();
            dispatch({ type: "reset" });
          }}
        >
          Reset
        </Button>
        <Button>{isUpdateSession ? "Update budget" : "Add budget"}</Button>
      </FormRow>
    </Form>
  );
}

export default BudgetForm;
