import React from "react";
import {DatePicker, Form, Input, InputNumber} from "antd";
import moment from "moment";

interface Item {
    key: string;
    firstName: string;
    lastName: number;
    dob: string;
    course:string;
    price:string;
    _id:string;
    dateofbirth:string,
}


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text' | 'datetime';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
                                                       editing,
                                                       dataIndex,
                                                       title,
                                                       inputType,
                                                       record,
                                                       index,
                                                       children,
                                                       ...restProps
                                                   }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    const dateFormat = "MM/DD/YYYY";

    return (
        <td {...restProps}>
            {editing ? (
                <>
                    {dataIndex === 'dob' ?
                        <Form.Item
                            name="dateofbirth"
                            style={{
                                margin: 0
                            }}
                            initialValue={moment(record.dob)}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`
                                }
                            ]}
                        >
                            <DatePicker
                                format={dateFormat}
                            />
                        </Form.Item>:
                        <Form.Item
                            name={dataIndex}
                            style={{ margin: 0 }}
                            rules={[
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ]}
                        >
                            {inputNode}
                        </Form.Item>
                    }
                </>
            ) : (
                children
            )}
        </td>
    );
};

export default EditableCell;
