import React from 'react';
import styled from 'styled-components';

export default function Radio({ options, name, onClick, selected }) {
  const StyledRadio = styled.div`
    max-width: 100%;
  `;

  const StyledUl = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    overflow: auto;
    flex-wrap: wrap;
    display: flex;
  `;

  return (
    <StyledRadio>
      <StyledUl>
        {options.map(option => {
          let color1 = name === 'Color' ? option.toLowerCase() : '#6f6f6f';
          let color2 =
            name === 'Color' ? option.toLowerCase() : 'rgb(243, 51, 97)';
          color1 = color1 === 'white' ? 'gray' : color1;
          color2 = color2 === 'white' ? 'gray' : color2;
          const StyledLi = styled.li`
            color: ${color1};
            display: flex;
            align-items: center;
            position: relative;
            float: left;
            margin-right: 5px;

            :hover label {
              color: ${color2};
            }

            :hover .check {
              border: 2px solid ${color2};
            }
          `;

          const StyledInput = styled.input`
            position: absolute;
            visibility: hidden;

            :checked ~ .check {
              border: 2px solid ${color2};
            }

            :checked ~ .check::before {
              background: ${color2};
            }

            :checked ~ label {
              color: ${color2};
            }
          `;

          const StyledLabel = styled.label`
            display: flex;
            align-items: center;
            position: relative;
            font-weight: 500;
            font-size: 0.9em;
            padding: 5px 5px 5px 20px;
            margin: 5px auto;
            height: 30px;
            z-index: 9;
            cursor: pointer;
            -webkit-transition: all 0.25s linear;
          `;

          const StyledCheck = styled.div`
            display: block;
            position: absolute;
            border: 2px solid ${color1};
            border-radius: 100%;
            height: 15px;
            width: 15px;
            left: 0px;
            z-index: 5;
            transition: border 0.25s linear;
            -webkit-transition: border 0.25s linear;

            ::before {
              display: block;
              position: absolute;
              content: '';
              border-radius: 100%;
              height: 5px;
              width: 5px;
              top: 3px;
              left: 3px;
              margin: auto;
              transition: background 0.25s linear;
              -webkit-transition: background 0.25s linear;
            }
          `;
          return (
            <StyledLi key={option}>
              <StyledInput
                onClick={onClick}
                type="radio"
                id={`${name}-${option}`}
                name={name}
                value={option}
                defaultChecked={selected === option}
              />
              <StyledLabel htmlFor={`${name}-${option}`}>{option}</StyledLabel>
              <StyledCheck className="check">
                <div className="" />
              </StyledCheck>
            </StyledLi>
          );
        })}
      </StyledUl>
    </StyledRadio>
  );
}
