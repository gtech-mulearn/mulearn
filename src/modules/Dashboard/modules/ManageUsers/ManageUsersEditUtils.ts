import { roles } from "@/MuLearnServices/types";
import {
    getColleges,
    getDistrict,
    getState
} from "../../../Common/Authentication/services/onboardingApis";
import * as Yup from "yup";

type Community = {
    id: string;
    title: string;
}[];
type IG = {
    id: string;
    name: string;
}[];
type Place = {
    value: string;
    label: string;
}[];

const schema = Yup.object({
    first_name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    last_name: Yup.string().max(20, "Must be 20 characters or less"),
    email: Yup.string().email("Invalid email address").required("Required"),
    mobile: Yup.string()
        .length(10, "Invalid mobile number")
        .required("Required"),
    community: Yup.array(),
    graduation_year: Yup.string()
        .nullable()
        .length(4, "Invalid graduation_year"),
    interest: Yup.array().required("Required"),
    role: Yup.array().required("Required")
});

const roleStr = (role: Community, roleName: string) => {
    //bad condition but it works
    if (role.length === 1 || !roleName) return "";
    return role.filter(item => item.title == roleName)[0]?.id || "";
};
const arrayIntersection = (userList: string[], mainList: string[]) => {
    return userList.filter(item => mainList.includes(item));
};
const inputs = (
    community: Community,
    role: Community,
    interestGroup: IG,
    user: UserData | undefined,
    company: Community,
    country: Place,
    state: Place,
    district: Place,
    college: Place,
    department: Place,
    formikRef: any,
    errorHandler: any,
    setState: any,
    setDistrict: any,
    setCollegTemp: any,
    setCollege: any,
    setDepartment: any
) => {
    const formikProps = {
        inputs: [
            {
                name: "first_name",
                label: "First Name",
                type: "text",
                placeholder: "First Name"
            },
            {
                name: "last_name",
                label: "Last Name",
                type: "text",
                placeholder: "Last Name"
            },
            {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Enter an email"
            },
            {
                name: "mobile",
                label: "Mobile",
                type: "text",
                placeholder: "Enter a mobile number"
            },
            {
                name: "discord_id",
                label: "Discord ID",
                type: "text",
                placeholder: "Enter your discord id"
            }
        ],
        selects: [
            {
                name: "community",
                label: "Community",
                options: community.map(item => ({
                    value: item?.id,
                    label: item.title
                })),
                isMulti: true,
                isClearable: true,
                isSearchable: true
            },
            {
                name: "role",
                label: "Role",
                options: role.map(item => ({
                    value: item?.id,
                    label: item.title
                })),
                isMulti: true,
                isClearable: true,
                isSearchable: true
            },
            {
                name: "interest",
                label: "Interest",
                options: interestGroup.map(item => ({
                    value: item?.id,
                    label: item.name
                })),
                isMulti: true,
                isClearable: true,
                isSearchable: true
            }
        ],
        dropDowns: user?.roles.includes(roleStr(role, roles.ASSOCIATE))
            ? [
                  {
                      name: "company",
                      label: "Company",
                      options: company.map(obj => {
                          return {
                              value: obj.id,
                              label: obj.title
                          };
                      }),
                      isClearable: true,
                      isSearchable: true
                  }
              ]
            : [
                  {
                      name: "country",
                      label: "Country",
                      options: country,
                      isClearable: true,
                      isSearchable: true,
                      addOnChange: (option: any) => {
                          formikRef.current.setFieldValue("state", "");
                          if (option)
                              getState(errorHandler, setState, {
                                  country: option.value
                              });
                          else {
                              setState([]);
                              setDistrict([]);
                          }
                      }
                  },
                  {
                      name: "state",
                      label: "State",
                      options: state,
                      isClearable: true,
                      isSearchable: true,
                      isDisabled: !state.length,
                      addOnChange: (option: any) => {
                          formikRef.current.setFieldValue("district", "");
                          if (option)
                              getDistrict(errorHandler, setDistrict, {
                                  state: option.value
                              });
                          else {
                              setDistrict([]);
                          }
                      }
                  },
                  {
                      name: "district",
                      label: "District",
                      options: district,
                      isClearable: true,
                      isSearchable: true,
                      isDisabled: !district.length,
                      addOnChange: (option: any) => {
                          getColleges(
                              setCollegTemp,
                              setCollege,
                              setDepartment,
                              errorHandler,
                              { district: option.value }
                          );
                      }
                  },
                  {
                      name: "college",
                      label: "College",
                      options: college,
                      isClearable: true,
                      isSearchable: true,
                      isDisabled: !college.length
                  },
                  {
                      name: "department",
                      label: "User Department",
                      options: department,
                      isClearable: true,
                      isSearchable: true,
                      isDisabled: !department.length
                  }
              ],
        enabler: {
            label: "User Graduation Year",
            name: "graduation_year",
            type: "number",
            placeholder: "Enter a graduation year"
        }
    };
    const initialValues = {
        // igName: name
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
        college: user?.organizations
            ? arrayIntersection(
                  user.organizations,
                  college.map(item => item.value)
              )[0] || null
            : null,
        community: user?.organizations
            ? arrayIntersection(
                  user.organizations,
                  community.map(item => item.id)
              )
            : [],
        company: user?.organizations
            ? arrayIntersection(
                  user.organizations,
                  company.map(item => item.id)
              )[0] || null
            : null,
        department: user?.department || null,
        graduation_year: user?.graduation_year || null,
        country: user?.country || "",
        state: user?.state || "",
        district: user?.district || "",
        interest: user?.interest_groups,
        role: user?.roles
    };
    return { formikProps, initialValues };
};

export { schema, inputs };
