import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModel from "./components/AddBudgetModel";
import AddExpenseModel from "./components/AddExpensesModel";
import ViewExpensesModel from "./components/ViewExpensesModel";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpensesModal, setShowAddExpensesModal] = useState(false);
  const [addExpensesModalBudgetId, setAddExpensesModalBudgetId] = useState();
  const [viewExpensesModalBudgetId, setviewExpensesModalBudgetId] = useState();

  function openAddExpensesModel(budgetId) {
    setShowAddExpensesModal(true);
    setAddExpensesModalBudgetId(budgetId);
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap="2" ClassName="mb-4">
          <h1 ClassName="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpensesModel}>
            Add Expenses
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "1rem",
            alignItems: "flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            return (
              <BudgetCard
                key={budget.key}
                name={budget.name}
                amount={amount}
                max={budget.max}
                OnAddExpensesClick={() => openAddExpensesModel(budget.id)}
                OnViewExpensesClick={() =>
                  setviewExpensesModalBudgetId(budget.id)
                }
              ></BudgetCard>
            );
          })}
          <UncategorizedBudgetCard
            OnAddExpensesClick={openAddExpensesModel}
            OnViewExpensesClick={() =>
              setviewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />

          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModel
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />

      <AddExpenseModel
        show={showAddExpensesModal}
        defaultBudgetId={addExpensesModalBudgetId}
        handleClose={() => {
          setShowAddExpensesModal(false);
        }}
      />

      <ViewExpensesModel
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => {
          setviewExpensesModalBudgetId();
        }}
      />
    </>
  );
}

export default App;
