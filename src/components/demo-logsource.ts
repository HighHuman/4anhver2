import { ILogSource } from "../common/model";

export const demoLogSource: ILogSource[] = [
  {
    id: "94355ebf-54c9-f703-5469-18dd32482992",
    inputName: "Amazon Web Services",
    properties: {
      queue_url:
        "https://sqs.us-east-1.amazonaws.com/887134122148/aws-cloudtrail",
      visibility_timeout: 300,
      api_timeout: 120,
      secret_access_key: "QBLu9q/MldBSijaEgtufF+ioTJ9URiB2DPRAcwsh",
      log_type: "cloudtrail",
      wait_time: 20,
      max_number_of_messages: 10,
      access_key_id: "AKIA45DKQOCSDRHEU5Q7",
      proxy_url: "",
    },
    protocol: "Cloudwatch",
    createdAt: 1.70396e12,
    updatedAt: 1.70396e12,
  },
  {
    id: "84a71512-4175-9393-2ec5-1857d6d07a36",
    inputName: "Amazon Web Services",
    properties: {
      access_key_id: "AKIA45DKQOCSDRHEU5Q7",
      proxy_url: "",
      log_type: "route53",
      wait_time: 20,
      max_number_of_messages: 10,
      api_timeout: 120,
      queue_url: "https://sqs.us-east-1.amazonaws.com/887134122148/route53",
      visibility_timeout: 300,
      secret_access_key: "QBLu9q/MldBSijaEgtufF+ioTJ9URiB2DPRAcwsh",
    },
    protocol: "Cloudwatch",
    createdAt: 1.70396e12,
    updatedAt: 1.70396e12,
  },
  {
    id: "5e87e741-399b-df5a-2731-0d6d4a812b06",
    inputName: "Amazon Web Services",
    properties: {
      secret_access_key: "QBLu9q/MldBSijaEgtufF+ioTJ9URiB2DPRAcwsh",
      proxy_url: "",
      queue_url: "https://sqs.us-east-1.amazonaws.com/887134122148/vpc-anhnt",
      log_type: "vpc_flow_logs",
      wait_time: 20,
      access_key_id: "AKIA45DKQOCSDRHEU5Q7",
      visibility_timeout: 300,
      max_number_of_messages: 10,
      api_timeout: 120,
    },
    protocol: "s3_sqs",
    createdAt: 1.70396e12,
    updatedAt: 1.70396e12,
  },
];
