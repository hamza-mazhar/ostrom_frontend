import React from 'react';
import {render, fireEvent, getByTestId} from '@testing-library/react';
import * as ApiServices from "../src/services/apiCalls"
import axios from 'axios';
import StudentTable from "./continers/StudentContainer"

jest.mock('axios', () => jest.fn());


global.matchMedia = global.matchMedia || function () {
    return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

test('Test AxiosRequest', async () => {
    const mRes = {status: 400};
    (axios as unknown as jest.Mock).mockResolvedValueOnce(mRes);
    const mock = await ApiServices.getAllStudent();
    expect(mock).toEqual(mRes);
    expect(axios).toHaveBeenCalledTimes(1);
});

test("Open Modal Test", () => {
    const {container} = render(<StudentTable/>);
    const button = getByTestId(container, 'btn-open-modal');
    fireEvent.click(button);
});







