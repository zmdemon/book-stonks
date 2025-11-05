import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

export const useBalanceStore = create(() => ({
  count: 0,
  balance: 325,
  income: 48,
  percent: 0,
  period: 'today',
}));

export const useBalanceHook = () =>
  useBalanceStore(
    useShallow((state) => ({
      balance: state.balance,
      income: state.income,
      percent: (state.income / state.balance) * 100,
      period: state.period,
    })),
  );

export const setPeriod = () => {
  const { period } = useBalanceStore.getState();
  useBalanceStore.setState({
    period: period !== 'today' ? 'today' : 'allTime',
  });
};
