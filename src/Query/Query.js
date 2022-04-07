import { gql } from "@apollo/client";

const Company = gql`
query{
  company {
    id
    name
  }
}`

const getComplex = gql`
query complex($companyid: ID!){
  complex(id: $companyid){
    id
    name
    reference
  }
}`

const getHouse =gql`
query complex($complexid: ID!){
  house(id: $complexid){
    id
    size
    rooms
    price
    location
    reference
  }
}`

const getBank = gql`
query house($id: ID!){
  bank(id: $id){
    id
    name
    upto
    duration
    starting_payment
    service
  }
}`

const getCalculate = gql`
query calculate($houseId: ID! $bankId: ID! $duration: Int!){
  calculate(
    bankId: $bankId
  	houseId: $houseId
  	duration: $duration
  )
}`

const createCompany =gql`
mutation createdCompany($name: String!){
  createdCompany(name:$name){
    id
    name
  }
}`

export  {
  Company,
  getComplex,
  getHouse,
  getBank,
  getCalculate,
  createCompany  
};