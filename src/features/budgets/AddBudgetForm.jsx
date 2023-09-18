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
import { isAfter, isBefore } from "date-fns";
import { useCreateBudget } from "./useCreateBudget";

const AddCategories = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Category = styled.li`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  & input {
    flex-basis: 100%;
  }
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
      return state.map((budget, i) =>
        i === action.payload.index ? action.payload.newValue : budget
      );
    }

    case "deleteCategoryBudget": {
      return state.toSpliced(action.payload, 1);
    }

    default:
      return state;
  }
}

function AddBudgetForm({ onCloseModal }) {
  const { createBudget, isCreating } = useCreateBudget();

  const [categoryBudgets, dispatch] = useReducer(reducer, []);
  const [categoryBudgetsError, setCategoryBudgetsError] = useState("");

  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;

  const categories = getCategories(
    "customExpenseCategories",
    expenseCategories
  );

  function onSubmit(data) {
    // ! refactor this validation
    // using state variable didnt work due to batching

    let error = "";
    setCategoryBudgetsError(error);
    categoryBudgets.forEach((el, i) => {
      // delete ones whos category does not exists (Select...)
      if (+el.amount <= 0) error = "Amount must be above 0";
      if (
        categories.filter((category) => category.name === el.category)
          .length === 0
      )
        error = "Must select a category";
    });
    if (error !== "") return setCategoryBudgetsError(error);

    // create budget data
    const newBudget = {
      ...data,
      categories: categoryBudgets,
    };
    createBudget(newBudget, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  function handleUpdateCategoryBudget(index, newValue) {
    dispatch({
      type: "updateCategoryBudget",
      payload: {
        index,
        newValue,
      },
    });
  }

  function handleDeleteCategoryBudget(index) {
    dispatch({ type: "deleteCategoryBudget", payload: index });
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Title" error={errors.title?.message}>
        <Input
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
          disabled={isCreating}
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
          disabled={isCreating}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="End date" error={errors.endDate?.message}>
        <Input
          disabled={isCreating}
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
          disabled={isCreating}
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
              dispatch({
                type: "addCategoryBudget",
                payload: { category: "Select...", amount: 0 },
              });
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

export default AddBudgetForm;
