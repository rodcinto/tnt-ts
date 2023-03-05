import npmlog from "npmlog";
import Mongoose from "./Mongoose";
import PersonModel from "./PersonModel";

class StaticModelFactory {
  public static createPersonModel(): PersonModel {
    return new PersonModel(new Mongoose(npmlog), npmlog);
  }
}

export default StaticModelFactory;
