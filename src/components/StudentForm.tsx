import { Form, Input, InputNumber, Button,DatePicker,
    Row, Col} from 'antd';
import React from "react";
import "./index.css"
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    getData: any;
}

const StudentForm:React.FC<EditableCellProps> = ({
                                                     getData,
                                                     ...restProps
                                                 })=> {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);
        getData(values)
        onReset()
    };

    const onReset = () => {
        form.resetFields(['firstName','lastName','dob','course','hours','price']);
    };

    return (
        <Form  layout={"inline"} name="nest-messages"  onFinish={onFinish} form={form} validateMessages={validateMessages}>
            <Row gutter={24}>
                <Col span={8} >
                    <Form.Item name={'firstName'} label="First Name" rules={[{ required: true }]}>
                        <Input data-testid="firstName" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'lastName'} label="Last Name" rules={[{ required: true }]}>
                        <Input data-testid="lastName" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'dob'} label="Date of Birth" rules={[{ required: true }]} >
                        <DatePicker data-testid="dob" format="YYYY-MM-DD"/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item name={'course'} label="Course Name"  rules={[{ required: true }]}>
                        <Input  data-testid="course" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'hours'} label="Hours" rules={[{ type: 'number', min: 0, max: 1000,
                    required:true
                    }]}>
                        <InputNumber
                            // formatter={(value:any) => `h ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            // parser={(value:any) => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: "100%" }}
                            data-testid="hours"
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'price'} label="Price" rules={[{ type: 'number', min: 0, max: 1000000,
                    required:true
                    }]}>
                        <InputNumber
                            style={{ width: "100%" }}
                            // formatter={(value:any) => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            // parser={(value:any) => value.replace(/\$\s?|(,*)/g, '')}
                            data-testid="price"

                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }} >
                <Button type="primary" htmlType="submit" data-test-id={"std-form"}
                        data-testid="studentFormButton"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default StudentForm;
