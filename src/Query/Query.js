import { gql } from "@apollo/client";

const Company = gql`
query{
  company {
    id
    name
  }
}`

const AllComplex = gql`
query{
  allComplex
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

const createComplex = gql`
mutation createdComplex($name: String! $reference: ID!){
  createdComplex(name:$name reference: $reference){
    id
    name
    reference
  }
}`

const createHouse = gql`
mutation createHouse(
  $price: Int! 
  $rooms: Int!
  $size: Int!
	$location: String!
  $reference: ID!
) {
  createHouse(
    price: $price 
    rooms: $rooms 
  	size: $size
    location: $location
    reference: $reference
  ){
    id
    size
    rooms
    price
    location
    reference
  }
}`

export  {
  Company,
  getComplex,
  getHouse,
  getBank,
  getCalculate,
  createCompany,
  createComplex,
  createHouse,
  AllComplex 
};