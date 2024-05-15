import { act } from '@testing-library/react';

import { renderHook } from '../../../../../test/test-utils';
import useCountdownTimer from '../..';

describe('useCountdownTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2023-07-14T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return the initial `timeLeft` object', () => {
    const targetDate = new Date('2023-07-15T00:00:00Z');
    const { result } = renderHook(() => useCountdownTimer(targetDate));
    expect(result.current).toEqual({
      days: 0,
      hours: 12,
      minutes: 0,
      seconds: 0,
      isCompleted: false
    });
  });

  it('should update the `timeLeft` object every second', () => {
    const targetDate = new Date('2023-07-14T12:00:10Z');
    const { result } = renderHook(() => useCountdownTimer(targetDate));

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 10,
      isCompleted: false
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 9,
      isCompleted: false
    });

    act(() => {
      jest.advanceTimersByTime(8000);
    });
    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 1,
      isCompleted: false
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: true
    });
  });

  it('should stop updating the `timeLeft` object when the `targetDate` is reached', () => {
    const targetDate = new Date('2023-07-14T12:00:10Z');
    const { result } = renderHook(() => useCountdownTimer(targetDate));

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 10,
      isCompleted: false
    });

    act(() => {
      jest.advanceTimersByTime(15000);
    });
    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: true
    });
  });
});
